import React, { useState } from "react";
import { Stepper } from "react-form-stepper";
import "./App.css";

function MyStep() {
  return (
    <Stepper activeStep={0}>
      <Step label="User details" />
      <Step label="Payment" />
      <Step label="Booking confirmation" />
    </Stepper>
  );
}

export default MyStep;
