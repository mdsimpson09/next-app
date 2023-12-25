import Image from 'next/image'
import logo from "@/public/logo.png";
 
const Logo = () => {
  return (
 <div>
    <Image src={logo} alt='logo' />

    {/* // <img src="/Users/Marli_1/Bootcamp/smallwhite.png"></img> */}
  </div> 
  )
}
export default Logo;