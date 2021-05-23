// import React, {useState} from "react";

// const FindAddr = () => {

//   const [isAddress, setIsAddress] = useState("");
//   const [isZoneCode, setIsZoneCode] = useState();

//   const handleComplete = (data) => {
//     let fullAddress = data.address;
//     let extraAddress = "";

//     if (data.addressType === "R") {
//       if (data.bname !== "") {
//         extraAddress += data.bname;
//       }
//       if (data.buildingName !== "") {
//         extraAddress +=
//           extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
//       }
//       fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
//     }
//     setIsZoneCode(data.zonecode);
//     setIsAddress(fullAddress);
//     console.log(data.zonecode)
//     console.log(fullAddress);
//   };

//     const postCodeStyle = {
//       display: "block",
//       position: "absolute",
//       top:"150px",
//       right:"-10px",
//       zIndex: "100",
//       padding: "7px"
//     }
    
// 	return (
//     <DaumPostcode 
//     autoClose
//     onComplete={handleComplete}
//     style={postCodeStyle}
//     height={300}
//     Address={isAddress}
//     ZoneCode={isZoneCode}
//   />
//     )
// }

// export default FindAddr;