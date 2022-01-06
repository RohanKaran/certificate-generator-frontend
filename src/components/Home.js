import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from "react";
import {Button, Carousel, Container, Figure, Form, Image} from "react-bootstrap";
import axios from "axios";
import Slideshow from "./ImageList";
import {FaDownload, FaTrash} from "react-icons/fa";
import JSZip from "jszip";
import {saveAs} from 'file-saver';


function Home(){
    const [org, setOrg ] = useState("");
    const [name, setName ] = useState("");
    const [imgs, setImgs] = useState([])
    const [bool, setBool] = useState(true)
    const [loading, setLoading] = useState(true)
    const backend_url = process.env.REACT_APP_BACKEND_URL



    const downPdf = async () => {
        const zip = new JSZip();
        for (let file = 0; file < imgs.length; file++){
            const img = 'data:image/png;base64,' + imgs[file].file
            const response = await fetch(img);
            // here image is url/location of image
            const blob = await response.blob();

            const image = new File([blob], 'image.png', {type: 'images/png'});
            zip.file(imgs[file].filename, image);
        }
        zip.generateAsync({ type: "blob" })
          .then(function (content) {
            saveAs(content, "Certificates.zip");
          });
    };




    const addImageHandler = async () => {
        await axios.post(backend_url+`/add/`,
            {'name':name , 'org': org , 'logo': baseImage.substr(22)})
            .then(res => {
                setBool(true);

                imgs.push(res.data)

                setBool(false)

            })
    };
    const handleSubmit = (e) => {
        setLoading(false);
        e.preventDefault();
        e.stopPropagation();
        addImageHandler().then(() => setLoading(true));
    };


    const [baseImage, setBaseImage] = useState("");

      const uploadImage = async (e) => {
        const file = e.target.files[0];
        console.log(e.target)
        const base64 = await convertBase64(file);
        setBaseImage(base64);
      };

      const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          try {
              fileReader.readAsDataURL(file);
          }
          catch {
              setBaseImage("")
          }

          fileReader.onload = () => {
            resolve(fileReader.result);
          };

          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };




    return(
        <>
            <header className={"text-left text-white bg-primary masthead"}>
            <Container>
                <div align={"center"}  hidden={baseImage===""} className={"mb-4"}>
                <Figure.Image src={baseImage}
                   fluid={true}
                   style={{width: "5rem", maxWidth: '15%'}}
                />
                </div>

                <h1 className={"text-center mb-4"} hidden={org===""}>{org}</h1>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" >
                    <Form.Label>Organization name</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Enter organization name"
                                  onChange={event => setOrg(event.target.value)}
                                  required
                    />
                  </Form.Group>

                    <Form.Group className="mb-3" >
                    <Form.Label>Organization logo</Form.Label>
                    <Form.Control type="file"
                                  placeholder="Upload organization logo"
                                  onChange={(e) => {
                                    uploadImage(e);
                                        }}
                                  accept={"image/png, image/jpeg"}

                    />
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
                          className={"btn btn-outline-light btn-xl mb-1 my-2"}
                  >
                    Add +
                  </Button>
                </Form>

            </Container>
                </header>
            <br/>

            <div align={"center"} hidden={loading} className={"mb-4"}>
            <Figure.Image src={"https://www.dropbox.com/s/aejzhvqvtegnp02/Spinner-1s-800px.svg?raw=1"}
                   fluid={true}
                   style={{width: "5rem", maxWidth: '15%'}}/>
                <span>Adding...</span>
                </div>


            {/*Preview*/}
            <Container align={"center"} className={"mb-5 carousel"} hidden={!bool}>
            <Carousel>
                <Carousel.Item >
                    <Image
                      src={`/base_text.png`}
                      alt="First slide"
                      fluid={true}
                      className={"img-thumbnail "}
                    />
                </Carousel.Item></Carousel>
            </Container>




            <Container align={"center"} className={"mb-5 carousel"} hidden={bool}>



                <h3><b style={{"color":"#2C3E50"}}>PREVIEW</b></h3>

                <div className="border-top border-5 border-dark hr align-items-center mt-4 mb-2"/>

                <div align={"right"}>
                    <Button variant={"outline-danger"} id={"clear"}
                            onClick={() => {
                                setImgs([])
                                setBool(true)
                            }}
                    >
                    <FaTrash className={"mb-1"}/> CLEAR
                    </Button>
                </div>


                <Slideshow images={imgs} hidden_props={bool}/>

                <Button variant={"outline-dark"} size={"lg"}
                        className={"my-5"}
                onClick={() => downPdf()}
                >
                    <FaDownload className={"mb-1"}/> DOWNLOAD ALL
                </Button>
            </Container>
        </>
    );
}

export default Home;