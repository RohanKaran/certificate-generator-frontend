import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from "react";
import {Button, Container, Form, Image} from "react-bootstrap";
import axios from "axios";
import Slideshow from "./ImageList";
import {FaDownload, FaTrash} from "react-icons/fa";
// import {jsPDF} from "jspdf";
import JSZip from "jszip";
import { saveAs } from 'file-saver';



function Home(){
    const [org, setOrg ] = useState("");
    const [name, setName ] = useState("");
    const [imgs, setImgs] = useState([])
    // const [img, setImage] = useState(null)
    const [bool, setBool] = useState(true)
    const [loading, setLoading] = useState(true)
    const backend_url = process.env.backend_url



    const downPdf = async () => {
        const zip = new JSZip();
        for (let file = 0; file < imgs.length; file++){
            const img = 'data:image/png;base64,' + imgs[file]
            const response = await fetch(img);
            // here image is url/location of image
            const blob = await response.blob();

            const image = new File([blob], 'image.png', {type: 'images/png'});
            zip.file(`cert`+ file.toString() + `.png`, image);
        }
        zip.generateAsync({ type: "blob" })
          .then(function (content) {
            saveAs(content, "Certificates.zip");
          });

        // const pdfURL = doc.output("bloburl");
        // window.open(pdfURL, "_blank")
        console.log("reached")
    };




    const addImageHandler = async () => {
        await axios.post(backend_url+`/add/`,
            {'name':name , 'org': org})
            .then(res => {
                setBool(true);
                setLoading(false);
                imgs.push(res.data)
                console.log(res)
                setLoading(true)
                setBool(false)

            })
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addImageHandler()
        ;
    };

    // useEffect(() => {
    //     axios.get(`http://127.0.0.1:8000/cat`)
    //         .then(res => {
    //             setImage(res.data.file)
    //             imgs.push(res.data)
    //             setBool(false)
    //             console.log("success")
    //         })
    //
    // }, []);



    return(
        <>
            <header className={"text-left text-white bg-primary masthead"}>
            <Container>
                {/*<img className="img-fluid d-block mx-auto mb-5" src="profile.png"/>*/}
                <h1 className={"text-center mb-4"}>{org}</h1>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" >
                    <Form.Label>Organization name</Form.Label>
                    <Form.Control type="text" placeholder="Enter organization name"
                                  onChange={event => setOrg(event.target.value)}/>
                    {/*<Form.Text className="text-muted">*/}
                    {/*  We'll never share your email with anyone else.*/}
                    {/*</Form.Text>*/}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword"
                  >
                    <Form.Label>Add Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name"
                                  onChange={event => setName(event.target.value)}
                                  required
                        />
                  </Form.Group>
                  <Button type="submit" variant={"light"}
                          className={"btn btn-outline-light btn-xl mb-1 my-2"}>
                    Add +
                  </Button>
                </Form>

            </Container>
                </header>
            <br/>
            {/*<Container>*/}
            {/*    <img src={`data:image/png;charset=utf-8;base64,${img}`} width={"100%"} alt={"certificate"}/>*/}
            {/*</Container>*/}

            <Container align={"center"} hidden={bool} className={"mb-5 carousel"}>

                <Image src={"https://www.dropbox.com/s/aejzhvqvtegnp02/Spinner-1s-800px.svg?raw=1"}
                   fluid={true}
                   hidden={loading}/>

                <h3><b style={{"color":"#2C3E50"}}>PREVIEW</b></h3>

                <div className="border-top border-5 border-dark hr align-items-center mt-4 mb-2"/>

                <div align={"right"}>
                    <Button variant={"danger"}
                            style={{
                                "background-color": "red",
                                color:"white",
                                "font-size":"1rem",
                                "border-radius": "0rem"}}
                            onClick={() => {
                                setImgs([])
                                setBool(true)
                            }}
                    >
                    <FaTrash className={"mb-1"}/> CLEAR
                    </Button>
                </div>

                <Slideshow images={imgs}/>

                <Button variant={"outline-dark"} size={"lg"}
                onClick={() => downPdf()}
                >
                    <FaDownload className={"mb-1"}/> DOWNLOAD ALL
                </Button>{' '}
            </Container>
        </>
    );
}

export default Home;