import Image from 'next/image'
import instagram from "@/public/instagram.png";
 
const Instagram = () => {
  return (
 <div>
    <Image src={instagram} alt='instagram' />

    {/* // <img src="/Users/Marli_1/Bootcamp/smallwhite.png"></img> */}
  </div> 
  )
}
export default Instagram;