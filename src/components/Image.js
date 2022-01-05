import {Image} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Img(props){
    return(
        <Image
              src={`data:image/png;charset=utf-8;base64,${props.data.file}`}
              alt="First slide"
              fluid={true}
              className={"img-thumbnail "}
            />
    )
}