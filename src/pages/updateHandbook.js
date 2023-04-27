import React, { Component } from "react";
import ReactQuill from "react-quill";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from 'draftjs-to-html';
import Collapsible from "react-collapsible";


export function PointHistory(props) {
    return (
        <div className="point_history_tile">
            <h5>Change in: {props.when}</h5>
            <p>Modification: {props.change}</p>
        </div>
    );
}

export function AgendaTile(props){
    return (
        <li onClick={props.handleAgendaClick} className="list-item agenda" data-target={"agenda"+props.num}>{props.name}</li>
    )
}


export function Placeholder(props){
  return (
    <h5 className="placeholder-tile">Select {"article" in props ? props.article : "a"} {props.text} first to {props.feature}</h5>
  )
}



// export function


class UpdateHandbook extends Component {
    constructor(props){
        super(props);
        this.state = {senate:0,point:0,editorState: EditorState.createEmpty(),}
        this.data = [{num:3,name:'Agenda 5',points:[
          {num:1,name:"Ag Pt 1", has_subpoints:true, subpoints:[
              {num:1,name:"Subpoint 1"},
              {num:2,name:"Subpoint 2"},
              {num:3,name:"Subpoint 3"},
          ]},
          {num:1,name:"Ag Pt 2", has_subpoints:true, subpoints:[

          ]},
          {num:1,name:"Ag Pt 2", has_subpoints:false}
      ]},
      {num:2,name:'Agenda 2',points:[
          {num:1,name:"Ag Pt 1", has_subpoints:true, subpoints:[
              {num:1,name:"Subpoint 1"},
              {num:2,name:"Subpoint 2"},
          ]},
          {num:1,name:"Ag Pt 2", has_subpoints:true, subpoints:[
              {num:1,name:"Subpoint 1"},
              {num:2,name:"Subpoint 2"},
              {num:2,name:"Subpoint 3"},
          ]},
      ]},]
    }


    onEditorStateChange = (editorState) => {
      this.setState({
        editorState,
      });
      console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    };

    handleTextChange = (e) => {
      console.log(e)
    }
    
    UpdateHandbookForm = (props) => {
      return (
          <form className="up_hb_form">
              <label for="up_hb_prop" class="form-label">Proposal</label>
              <input readOnly={true} type="text" class="form-control" id="up_hb_prop" placeholder="Proposal for the Senate Point"></input>
              <label for="up_hb_res" class="form-label">Resolution</label>
              <input readOnly={true} type="text" class="form-control" id="up_hb_res" placeholder="Resolution for the Senate Point"></input>
              <div className="boxing-div">
              <select>
                <option selected>Choose the Handbook Section</option>
                {
                  props.sections.map((val) => {
                    return <option value={val.value}>{val.text}</option>
                  })
                }
              </select>
              <select>
                <option selected>Choose the Handbook Point</option>
                {
                  props.points.map((val) => {
                    return <option value={val.value}>{val.text}</option>
                  })
                }
              </select>
              </div>
  
                
              <Editor
                editorState={this.state.editorState}
                wrapperClassName="wysiwyg-wrapper"
                editorClassName="wysiwyg"
                onEditorStateChange={this.onEditorStateChange}
              />
              
              
              <div className="boxing-div">
                  <button className="btn btn-success">Create</button>
                  <button className="btn btn-danger">Cancel</button>
              </div>
          </form>
      )
  }

   
      handleSenateClick = (e) => {
        this.setState({
            senate: Number(e.target.dataset.target.split("_").slice(-1)),
            point: 0
        })
    }

      handleSenatePointClick = (e) => {
        // console.log(e.target.dataset.target.split("_"))
        this.setState({
            point:Number(e.target.dataset.target.split("_").slice(-1)),
        })
    }

    handlePreview = (e) => {
      
    }

    handlePublish = (e) => {

    }


    render() {
      return (<div className="up_hb_cont">
      <div className="col-sm-3 up_hb_menu left-pane">
        <div>
          <button onClick={this.handlePreview} className="btn btn-primary">Preview Handbook</button>
          <button onClick={this.handlePublish} className="btn btn-primary">Publish Handbook</button>
        </div>
      <h2>Senate Decisions</h2>
      <ul className="list-group">
            {
                this.data.map((val) => {
                    return <li data-active={this.state.senate == val.num} onClick={this.handleSenateClick} className="list-item agenda clickable" data-target={"up_hb_sen_pt_"+val.num}>{val.name}</li>
                })
            }
      </ul>
    </div>

    <div className="col-sm-3 up_hb-submenu center-pane">
                {this.state.senate !== 0 && <React.Fragment> 
                    {/* <DropdownButton onSelect={(e) => console.log(e)} as={ButtonGroup} title="Dropdown" id="bg-nested-dropdown">
                        <Dropdown.Item eventKey="1">Delete Selected Agenda</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Finalise Agenda for Senate</Dropdown.Item>
                        <Dropdown.Item eventKey="3">Rename Selected Agenda</Dropdown.Item>
                    </DropdownButton> */}
                    {/* <button className="btn mb-3" data-target="create-agenda" onClick={this.handlenewpoint}>New Agenda Point</button>  */}
                        <button className="btn btn-warning mb-3" data-target="create-agenda" onClick={this.handleDeleteAgenda}>Unfinalise Agenda</button> 
                        
                     <h2>Dcision Points</h2></React.Fragment>}
                {this.data.map((val, id) => {
                    return (
                        this.state.senate === val.num &&
                        <ul id={"agenda_" + id} className="list-group">
                            {val.points.map((det, id) => {
                                return (
                                    det.has_subpoints ?
                                        (<Collapsible trigger={det.name}>
                                            {
                                                det.subpoints.map((sp) => {
                                                    return (
                                                        <li data-active={this.state.point === det.num} onClick={this.handlePointClick} className="list-item agenda-point clickable" data-target={"agenda-pt_" + sp.num}>Handbook Sub Point {sp.num}</li>
                                                    )
                                                })
                                            }
                                        </Collapsible>)

                                        : <li data-active={this.state.point === det.num} onClick={this.handlePointClick} className="list-item agenda-point clickable" data-target={"agenda-pt_" + det.num}>{det.name}</li>

                                )
                            })}

                        </ul>
                    )
                })
                }

            </div>
            
    <div className="col-sm-6 right-pane up_hb_pane">
          {
            this.state.section !=0 ? <this.UpdateHandbookForm 
            hb_data={[["fgsdgdfgfgdfgfgd","dfgdfgdfgdfgdfg","asdasddfghhkjjhg"],
             ["fasdgsdgdfgfgdfgfgd","uiouidfgdfgdfgdfgdfg","atyutysdasddfghhkjjhg"],
              ["utyrtyfgsdgdfgfgdfgfgd","bvnbvndfgdfgdfgdfgdfg","hjkjasdasddfghhkjjhg"]]}
               sections={[{value:1,text:"Point 1: dfgfdgdf"},
               {value:2,text:"Point 2: hjkdfgfdhjkhgdf"},
               {value:3,text:"Point 3: jkkdfgfdgdf"}]} 
               points={[{value:1,text:"Section 1: dfgfdgdf"},
               {value:2,text:"Section 2: hjkdfgfdhjkhgdf"},
               {value:3,text:"Section 3: jkkdfgfdgdf"}] }/>

               : <Placeholder text="senate point" feature="to edit the handbook" />
          }
      
    

    </div>
</div>);
    }
  }
  export default UpdateHandbook;