import { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import QRCode from "react-qr-code";

import { io } from "socket.io-client";

const serverURL = "https://vc-birthday-server.onrender.com";
const getQrCodeApi = (sessionId) =>
  serverURL + `/api/get-auth-qr?sessionId=${sessionId}`;

const socket = io(serverURL);

function PolygonIDVerifier({
  credentialType,
  issuerLink,
  onVerificationResult,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sessionId, setSessionId] = useState("");
  const [qrCodeData, setQrCodeData] = useState();
  const [isHandlingVerification, setIsHandlingVerification] = useState(false);
  const [verificationCheckComplete, setVerificationCheckComplete] =
    useState(false);
  const [verificationMessage, setVerfificationMessage] = useState("");
  const [socketEvents, setSocketEvents] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      setSessionId(socket.id);

      // emit this session's events only
      socket.on(socket.id, (arg) => {
        setSocketEvents((socketEvents) => [...socketEvents, arg]);
      });
    });
  }, []);

  useEffect(() => {
    const fetchQrCode = async () => {
      const response = await fetch(getQrCodeApi(sessionId));
      const data = await response.text();
      return JSON.parse(data);
    };

    if (sessionId) {
      fetchQrCode().then(setQrCodeData).catch(console.error);
    }
  }, [sessionId]);

  // socket event side effects
  useEffect(() => {
    if (socketEvents.length) {
      const currentSocketEvent = socketEvents[socketEvents.length - 1];
      console.log(currentSocketEvent);

      if (currentSocketEvent.fn == "handleVerification") {
        if (currentSocketEvent.status == "IN_PROGRESS") {
          setIsHandlingVerification(true);
        } else {
          setIsHandlingVerification(false);
          setVerificationCheckComplete(true);
          if (currentSocketEvent.status == "DONE") {
            setVerfificationMessage("✅ Verified VC");
            setTimeout(() => {
              reportVerificationResult(true);
            }, "2000");
            socket.close();
          } else {
            setVerfificationMessage("❌ Error verifying VC");
          }
        }
      }
    }
  }, [socketEvents]);

  const reportVerificationResult = (result) => {
    onVerificationResult(result);
  };

  function openInNewTab(url) {
    var win = window.open(url, "_blank");
    win.focus();
  }

  return (
    <div>
      {/* <Button onClick={() => reportVerificationResult(true)}> */}
      <Button onClick={onOpen}>Prove access rights</Button>

      {qrCodeData && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Prove access rights</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {isHandlingVerification && <Spinner />}
              {verificationMessage}
              {qrCodeData &&
                !isHandlingVerification &&
                !verificationCheckComplete && (
                  <QRCode value={JSON.stringify(qrCodeData)} />
                )}

              {qrCodeData.body?.scope[0].query && (
                <p>Type: {qrCodeData.body?.scope[0].query.type}</p>
              )}

              {qrCodeData.body.message && <p>{qrCodeData.body.message}</p>}

              {qrCodeData.body.reason && (
                <p>Reason: {qrCodeData.body.reason}</p>
              )}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost" onClick={() => openInNewTab(issuerLink)}>
                Get {credentialType} VC
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}

export default PolygonIDVerifier;
