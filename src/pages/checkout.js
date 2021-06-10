import {
  Flex,
  Center,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  useToast,
} from "@chakra-ui/react";
import { HeaderCheckout } from "../components/layout/HeaderCheckout";
import Details from "../components/checkout/Details";
import Payment from "../components/checkout/Payment";
import { PaymentContext } from "../context/PaymentContext";
import React, { useState, useContext } from "react";

function checkout() {
  const toast = useToast();

  const [tabIndex, setTabIndex] = useState(0);
  const handleTabsChange = (index) => setTabIndex(index);

  const [paymentItem, setPaymentItem] = useContext(PaymentContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const updateFirstName = (firstName) => {
    setFirstName(firstName);
  };
  const updateLastName = (lastName) => {
    setLastName(lastName);
  };
  const updateEmail = (email) => {
    setEmail(email);
  };
  const updateAddress = (address) => {
    setAddress(address);
  };
  const updatePhone = (phone) => {
    setPhone(phone);
  };

  const addPaymentItem = (e) => {
    // setPaymentItem({ firstName, lastName, email, address, phone });
    if (firstName === "") {
      toast({
        title: "First name empty",
        description: "Please fill in your first name",
        status: "warning",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
    } else if (lastName === "") {
      toast({
        title: "Last name empty",
        description: "Please fill in your last name",
        status: "warning",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
    } else if (email === "") {
      toast({
        title: "Email empty",
        description: "Please fill in your email",
        status: "warning",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
    } else if (address === "") {
      toast({
        title: "Address empty",
        description: "Please fill in your address",
        status: "warning",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
    } else if (phone === "") {
      toast({
        title: "Phone empty",
        description: "Please fill in your phone number",
        status: "warning",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
    } else {
      setPaymentItem((prevItems) => [
        ...prevItems,
        { firstName, lastName, email, address, phone },
      ]);
    }

    console.log(paymentItem);
    console.log(firstName, lastName, email, address, phone);
  };

  return (
    <Center backgroundColor="background">
      <Flex width={["full", "60vw"]} height="100vh" direction="column">
        <HeaderCheckout />
        <Flex
          backgroundColor="text"
          height="150vh"
          width="auto"
          borderRadius="20px 20px 0px 0px"
          direction="column"
        >
          <Tabs
            variant="enclosed"
            isFitted
            index={paymentItem.length != 1 ? 1 : 0}
            onChange={handleTabsChange}
          >
            <TabList>
              <Tab
                textColor="background"
                _selected={{ color: "background", bg: "text" }}
                backgroundColor="secondaryBackground"
                borderRadius="20px 0px 0px 0px"
                isDisabled={tabIndex == 1}
              >
                Contact
              </Tab>
              <Tab
                textColor="background"
                _selected={{ color: "background", bg: "text" }}
                backgroundColor="secondaryBackground"
                borderRadius="0px 20px 0px 0px"
                isDisabled={tabIndex == 0}
              >
                Payment
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel color="background">
                <Details
                  setTabIndex={setTabIndex}
                  paymentItem={paymentItem}
                  addPaymentItem={addPaymentItem}
                  firstName={firstName}
                  lastName={lastName}
                  email={email}
                  address={address}
                  phone={phone}
                  updateFirstName={updateFirstName}
                  updateLastName={updateLastName}
                  updateEmail={updateEmail}
                  updateAddress={updateAddress}
                  updatePhone={updatePhone}
                />
              </TabPanel>
              <TabPanel color="background" backgroundColor="text">
                <Center>
                  <Payment setTabIndex={setTabIndex} />
                </Center>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </Center>
  );
}

export default checkout;
