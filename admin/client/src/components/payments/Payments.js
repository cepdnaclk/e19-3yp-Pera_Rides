import styled from "styled-components";
import OnePayment from "./OnePayment";
import { useEffect, useState } from "react";
import apiConnection from "../../apiConnection";

const PayMain = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 10px;
  overflow-y: auto;
`;

const Payments = () => {
  const [userPayments, setUserPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAllSlips = async () => {
      setIsLoading(false);
      try {
        setIsLoading(true);
        const response = await apiConnection.get("/payments");
        setUserPayments(response.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };

    getAllSlips();
  }, []);

  const removeSlip = (slipId) => {
    const newPayments = userPayments.filter(
      (paymnet) => paymnet._id !== slipId
    );
    setUserPayments(newPayments);
  };

  return (
    <PayMain>
      {isLoading ? (
        <p style={{ padding: "50px", fontSize: "20px" }}>Loading...</p>
      ) : (
        userPayments?.map((payment) => (
          <OnePayment
            key={payment._id}
            slipId={payment._id}
            userId={payment.userId}
            slipImg={payment.image}
            marked={payment.marked}
            removeSlip={removeSlip}
            postedDate={payment.createdAt}
            revenueUpdated={payment.revenueUpdated}
          />
        ))
      )}
    </PayMain>
  );
};

export default Payments;
