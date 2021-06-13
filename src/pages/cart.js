import {
  Flex,
  Heading,
  Spacer,
  Text,
  Center,
  useToast,
} from "@chakra-ui/react";

import { SmallButton } from "../components/buttons/SmallButton";
import CartItem from "../components/cart/CartItem";
import DeliveryOption from "../components/cart/DeliveryOption";
import { Header } from "../components/layout/Header";
import Link from "next/link";
import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { PaymentContext } from "../context/PaymentContext";

function cart() {
  const toast = useToast();
  const [items, setItems] = useContext(CartContext);
  const [paymentItem, setPaymentItem] = useContext(PaymentContext);

  const [deliveryCost, setDeliveryCost] = useState(10);

  const updateDeliveryCost = (index) => {
    if (index == 0) {
      setDeliveryCost(0);
    } else {
      setDeliveryCost(10);
    }
  };

  const handleRemove = (id) => {
    const newList = items.filter((item) => items.indexOf(item) !== id);

    setItems(newList);
    toast({
      title: "Item deleted",
      description: "Item successfully deleted from cart",
      status: "warning",
      duration: 2500,
      isClosable: true,
      position: "top",
    });
  };

  const addPaymentItem = (e) => {
    //e.preventDefault();
    if (items.length == 0) {
      toast({
        title: "Cart is empty",
        description: "No item in cart",
        status: "warning",
        duration: 2500,
        isClosable: true,
        position: "top",
      });
    } else {
      setPaymentItem([{ items, deliveryCost }]);
    }
  };

  return (
    <Center backgroundColor="background">
      <Flex
        height="100vh"
        direction="column"
        backgroundColor="background"
        direction="column"
        width={["100vw", "60vw"]}
      >
        <Header />
        <Flex
          backgroundColor="text"
          height="full"
          borderRadius="20px 20px 0px 0px"
          direction="column"
          padding={["5", "10"]}
        >
          <Heading fontSize="xl" color="background">
            Cart
          </Heading>

          {items.map((item, i) => {
            return (
              <CartItem
                item={item}
                key={i}
                handleRemove={handleRemove}
                index={i}
              />
            );
          })}

          <DeliveryOption onChange={updateDeliveryCost} />

          <Flex
            direction="row"
            paddingLeft="5"
            paddingTop="2"
            width={["80vw", "auto"]}
            paddingRight={["0", "3"]}
          >
            <Text fontSize="lg" fontWeight="bold" color="background">
              Total
            </Text>
            <Spacer />
            <Text fontSize="md" fontWeight="bold" color="background">
              SGD{" "}
              {items.reduce((accumulator, cartItem) => {
                return accumulator + cartItem.value;
              }, 0) + deliveryCost}
            </Text>
          </Flex>
          <Flex paddingTop="5" justifyContent="flex-end">
            <Link href={items.length == 0 ? "" : "/checkout"}>
              <SmallButton name={"Check Out"} onClick={addPaymentItem} />
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Center>
  );
}

export default cart;
