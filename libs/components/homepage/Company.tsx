import useDeviceDetect from "@/libs/hooks/useDeviceDetect";

const Company = () => {
  const device = useDeviceDetect();

  if (device === "mobile") {
    return <div>EVENT CARD</div>;
  } else {
    return <div></div>;
  }
};

export default Company;
