import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { CreditCard, ArrowRight } from "lucide-react";

// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";

import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress?.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-xl mx-auto mt-8"
      >
        <div className="p-6 rounded-2xl shadow-md bg-white">
          <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-blue-600" />
            Payment Method
          </h1>

          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <label className="text-base mb-2 block">Select Method</label>
              <div className="space-y-3">
                <label
                  htmlFor="paypal"
                  className="flex items-center space-x-3 rounded-lg border p-3 cursor-pointer hover:shadow-sm"
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="paypal"
                    value="PayPal"
                    checked={paymentMethod === "PayPal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>PayPal or Credit Card</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl py-2 flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </motion.div>
    </FormContainer>
  );
};

export default PaymentScreen;
