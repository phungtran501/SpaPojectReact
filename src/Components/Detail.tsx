import { useParams } from "react-router-dom";

const Detail = () => {

    const {name} = useParams(); 

    return(
        <div>
            this is detail
            {name}
        </div>
    )
}

export default Detail;