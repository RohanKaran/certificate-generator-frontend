import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from "react";
import {Button, Carousel as Car, Container, Figure, Form, Image, ToggleButton} from "react-bootstrap";
import axios from "axios";
import Slideshow from "./ImageList";
import {FaCheck, FaDownload, FaPlus, FaTrash} from "react-icons/fa";
import JSZip from "jszip";
import {saveAs} from 'file-saver';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


function Home(){
    const [org, setOrg ] = useState("");
    const [name, setName ] = useState("");
    const [imgs, setImgs] = useState([])
    const [bool, setBool] = useState(true)
    const [loading, setLoading] = useState(true)
    const [checked, setChecked] = useState('1');
    const backend_url = process.env.REACT_APP_BACKEND_URL



    const downPdf = async () => {
        const zip = new JSZip();
        for (let file = 0; file < imgs.length; file++){
            const img = 'data:image/png;base64,' + imgs[file].file
            const response = await fetch(img);
            // here image is url/location of image
            const blob = await response.blob();

            const image = new File([blob], 'image.png', {type: 'images/png'});
            zip.file(imgs[file].filename + "_" + (file + 1) + ".png", image);
        }
        zip.generateAsync({ type: "blob" })
          .then(function (content) {
            saveAs(content, "Certificates.zip");
          });
    };




    const addImageHandler = async () => {
        await axios.post(backend_url+`/add/`,
            {'index': checked, 'name':name , 'org': org , 'logo': baseImage.substr(22)})
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


    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 3
      }
    };




    return(
        <>

            <header className={"text-left text-white bg-primary masthead"}>


         {/*--------*/}
            {/*template*/}
            {/*--------*/}



              <Container align={"center"} id={"carousel-multi"} className={"mb-5"}>
            <Carousel
                swipeable={true}
                draggable={true}
                showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={false}
                keyBoardControl={true}
                customTransition="transform 500ms ease-in-out"
                transitionDuration={500}
                itemClass="image-item-padding-10px"
                // removeArrowOnDeviceType = {'mobile'}
            >
            <div className={"mx-2"}>
                  <Figure>
                      <Figure.Image
                          src={"1"}
                      />
                      <ToggleButton
                        id="check-1"
                        className={"rounded-circle mb-4"}
                        variant={"outline-light"}
                        type="checkbox"
                        checked={checked==='1'}
                        onChange={(e) => {
                            setChecked(e.currentTarget.value)
                        }}
                        value='1'
                  >
                      <FaCheck className={"mb-1"}/>
                  </ToggleButton>
                  </Figure>
            </div>




              <div className={"mx-2"}><Figure>
                      <Figure.Image
                          src={"2"}
                      />
                  <ToggleButton
                        id="check-2"
                        className={"rounded-circle mb-4"}
                        variant={"outline-light"}
                        type="checkbox"
                        checked={checked==='2'}
                        onChange={(e) => {
                            setChecked(e.currentTarget.value)
                        }}
                        value='2'
                  >
                      <FaCheck className={"mb-1"}/>
                  </ToggleButton>

                  </Figure></div>

              <div className={"mx-2"}><Figure>
                      <Figure.Image
                          src={"3"}
                      />
                  <ToggleButton
                        id="check-3"
                        className={"rounded-circle"}
                        variant={"outline-light"}
                        type="checkbox"
                        checked={checked==='3'}
                        onChange={(e) => {
                            setChecked(e.currentTarget.value)
                        }}
                        value='3'
                  >
                      <FaCheck className={"mb-1"}/>
                  </ToggleButton>


                  </Figure></div>

              <div className={"mx-2"}>
                  <Figure>
                      <Figure.Image
                          src={"4"}
                      />
                  <ToggleButton
                        id="check-4"
                        className={"rounded-circle mb-4"}
                        variant={"outline-light"}
                        type="checkbox"
                        checked={checked==='4'}
                        onChange={(e) => {
                            setChecked(e.currentTarget.value)
                        }}
                        value='4'
                  >
                      <FaCheck className={"mb-1"}/>
                  </ToggleButton>
                  </Figure></div>
                <div className={"mx-2"}>
                  <Figure>
                      <Figure.Image
                          src={"5"}
                      />
                  <ToggleButton
                        id="check-5"
                        className={"rounded-circle mb-4"}
                        variant={"outline-light"}
                        type="checkbox"
                        checked={checked==='5'}
                        onChange={(e) => {
                            setChecked(e.currentTarget.value)
                        }}
                        value='5'
                  >
                      <FaCheck className={"mb-1"}/>
                  </ToggleButton>
                  </Figure></div>
            </Carousel>
        </Container>














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
                                  accept={"image/*"}

                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Add Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name"
                                  onChange={event => setName(event.target.value)}
                                  required
                        />
                  </Form.Group>
                    <div align={"center"} className={"mt-4"}>
                        <Button type="submit" variant={"light"}
                              className={"btn btn-outline-light btn-xl"}
                      >
                        <FaPlus className={"mb-1"}/> ADD
                      </Button>
                        </div>
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






            <h3><b style={{"color":"#2C3E50"}}>PREVIEW</b></h3>
            <div className="border-top border-5 border-dark hr align-items-center mt-4 mb-2"/>


            <Container align={"center"} className={"mb-5 carousel"}
                            hidden={!bool} >

                <div align={"right"}>
                    <Button id={"clear"}
                            className={"btn btn-outline-danger"}
                            onClick={() => {
                                setImgs([])
                                setBool(true)
                            }}
                    >
                    <FaTrash className={"mb-1"}/> CLEAR
                    </Button>
                </div>

            <Car
                className={"carousel border border-2 border-dark"}
                hidden={!bool}>
                <Car.Item >
                    <Image
                      src={`/base_text.png`}
                      alt="First slide"
                      fluid={true}
                      className={"img-thumbnail "}
                    />
                </Car.Item></Car>
            </Container>



            <Container align={"center"} className={"mb-5 carousel"} hidden={bool}>
                <div align={"right"}>
                    <Button id={"clear"}
                            className={"btn btn-outline-danger"}
                            hidden={bool}
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