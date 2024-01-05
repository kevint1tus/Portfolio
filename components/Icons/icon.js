import {
  IconMail,
  IconLinkedin,
  IconInstagram,
  IconTwitter,
  IconGithub,
  IconExternal,
  IconVSCO
} from "@/components/Icons";

const Icon = ({ name }) => {
  switch (name) {
    case "mail":
      return <IconMail />;
    case "github":
      return <IconGithub />;
    case "vsco":
      return <IconVSCO />;
    case "linkedin":
      return <IconLinkedin />;
    case "instagram":
      return <IconInstagram />;
    case "twitter":
      return <IconTwitter />;
    default:
      return <IconExternal />;
  }
};

export default Icon;
