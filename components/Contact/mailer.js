import emailjs from "@emailjs/browser";

const mail = ({ name, email, message }) => {
  return emailjs.send(
    "service_p5d0v99", // Replace with your actual SERVICE_ID
    "template_dza52gk", // Replace with your actual TEMPLATE_ID
    { name, email, message },
    "3l1R3axx5CbKOqSea" // Replace with your actual USER_ID
  );
};

export default mail;
