import logo from './logo.svg';
import './App.css';
import { Button, Offcanvas, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { FaChevronLeft, FaPlus , FaMinus } from 'react-icons/fa';

function App() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [segmentName, setSegmentName] = useState("");
  const [thisSelectedSegment, setThisSelectedSegment] = useState("");
  const [selectedSchema, setSelectedSchema] = useState([]);

  const schemaOptions = [
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" }
  ]

  const initiateSaveSegment = () =>{
    setSegmentName("");
    setThisSelectedSegment("");
    setSelectedSchema([]);
    handleShow()
  }

  const setSelectedSegmentData = (val , idx) =>{
    const thisSchema = schemaOptions.find(obj => obj.value === val);
    setThisSelectedSegment(val);
    const existingSchema = [...selectedSchema]
    existingSchema[idx] = thisSchema
    setSelectedSchema(existingSchema)
  }

  const addSegment = () =>{
    setSelectedSchema([...selectedSchema , { label : 'Add Schema To Segment' , value : '' }]);
    setThisSelectedSegment("")
  }

  const removeSegment = (index) =>{
    const filteredSchema = [...selectedSchema].filter((obj , idx) => idx !== parseInt(index));
    setSelectedSchema(filteredSchema)
  }

  const saveSegment = () => {

    if((segmentName.trim()).length !== 0){
      const SegmentData = {
        "segment_name": segmentName,
        "schema": selectedSchema.map((data) =>{
          const { label , value } = data
          return {[value] : label}
        })
      }

      console.log("Output = ", SegmentData)
    } else {
      window.alert("Enter Segment Name")
    }

    
  }

  const styles = {
    canvasHeader: {
      backgroundColor: '#009688'
    },
    canvasTitle: {
      color: 'white',
    },
    segmentNameInput: {
      width: '100%',
      padding: 5
    },
    select : {
      width : '100%',
      padding : 4,
      fontSize : '14px'
    },
    link: {
      color: '#009688',
      textDecoration: 'underline',
      cursor: 'pointer',
      fontSize: '10px'
    },
    saveBtn: {
      marginRight: 3,
      backgroundColor: '#009688'
    },
    cancelBtn: {
      color: 'red'
    },
    traits : {
      display : 'flex',
      justifyContent : 'center',
      alignItems : 'center',
      fontSize : '12px'
    },
    dot1:{
      height : '13px',
      width : '13px',
      backgroundColor : '#57e557',
      borderRadius : '50%',
      display : 'block'
    },    
    dot2:{
      height : '13px',
      width : '13px',
      backgroundColor : '#b916d7',
      borderRadius : '50%',
      display : 'block'
    }
  }

  return (
    <div className="App">
      <Row className='mt-3'>
        <Col md={3}>
          <Button variant="primary" onClick={initiateSaveSegment} className="me-2">
            Save Segment
          </Button>
        </Col>
      </Row>

      <div className='SegmentView'>
        <Offcanvas show={show} onHide={handleClose} placement={'end'} backdrop="static">
          <Offcanvas.Header
            style={styles.canvasHeader}
          >
            <Offcanvas.Title
              style={styles.canvasTitle}
            >
              <FaChevronLeft
                onClick={handleClose}
                style={{ cursor: 'pointer', marginRight: '10px' }}
              />
              Saving Segment
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Row>
              <Col lg={12}>
                <p>Enter the Name of the Segment</p>
                <input
                  style={styles.segmentNameInput}
                  type="text"
                  placeholder='Name of The Segment'
                  value={segmentName}
                  onChange={(e) => setSegmentName(e.target.value)}
                />
                <p className='mt-3'>To save your segment,you need to add the schemas to build the query</p>

                <Row  className="justify-content-md-end">
                  <Col lg={4}>
                      <p style={styles.traits}><span style={styles.dot1}></span> &nbsp;  - User Traits</p>
                  </Col>
                  <Col lg={4}>
                    <p style={styles.traits}><span style={styles.dot2}></span>  &nbsp; - Group Traits</p>
                  </Col>
                </Row>

                {selectedSchema.length ? (selectedSchema.map((element , index) => (
                  <div key={index} style={{marginTop : '10px'}}>
                    
                    <Row>
                      <Col lg={11}>
                        <select
                          style={styles.select}
                          value={element.value}
                          onChange={(e) => setSelectedSegmentData(e.target.value, index)}
                        >
                          <option value={""} style={{ display: 'none' }}>Add Schema To Segment</option>
                          {schemaOptions?.length && schemaOptions.map((data, idx) => (
                            <option key={idx} value={data.value}>{data.label}</option>
                          ))}
                        </select>
                      </Col>
                      <Col lg={1}>
                        <FaMinus
                          style={{ cursor: 'pointer' }}
                          onClick={() => removeSegment(index)}
                        />
                      </Col>
                    </Row>
                      
                    

                  </div>
                ))) : null}

              </Col>
            </Row>

            { (!selectedSchema.length || thisSelectedSegment !== "") && (
              <Row>
              <Col>
                <span                 
                  style={styles.link}
                  onClick={addSegment}
                >
                  <FaPlus
                    style={{ marginRight: '3px' }}
                  />
                  Add New Segment
                </span>
              </Col>
            </Row>
            )}

            <Row className='mt-3'>
              <Col lg={12}>
                <Button
                  style={styles.saveBtn}
                  onClick={saveSegment}
                >
                  Save the Segment
                </Button>
                <Button
                  style={styles.cancelBtn}
                  variant="light"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Col>
            </Row>

          </Offcanvas.Body>
        </Offcanvas>
      </div>

    </div>
  );
}

export default App;
