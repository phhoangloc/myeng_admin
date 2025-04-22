import axios from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
export const MyImage = ({ src }: { src: string }) => {

    const [_isImage, set_isImage] = useState<boolean>(false)

    const checkImage = async (src: string) => {
        try {
            await axios.get("/_next/image?url=" + src + "&w=640&q=75")
            set_isImage(true)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            set_isImage(false)
        }
    }

    useEffect(() => {
        checkImage(src)
    }, [src])


    return (
        _isImage ?
            <Image src={src} width={500} height={500} className="w-full h-max" alt="pic" /> :
            <InsertDriveFileIcon className="!m-auto !w-1/3 !h-1/3" />
    )

}