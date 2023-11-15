import { useParams } from "react-router-dom";

const Detail = () => {

    const {name} = useParams(); //useState, useEffect, useParams ---> hook

    return(
        <div>
            this is detail
            {name}
        </div>
    )
}

export default Detail;