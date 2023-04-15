import { Component } from "react";
import ReactQuill from "react-quill";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from 'draftjs-to-html';


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
        this.state = {section:0,point:0,editorState: EditorState.createEmpty(),}
        this.data = [{num:1,name:'Senate Pt 1',points:[1,2,3]},
        {num:2,name:'Senate Pt 2',points:[1,2,3]},
        {num:3,name:'Senate Pt 3',points:[1,2,3,4]},
        {num:4,name:'Senate Pt 4',points:[1,2,3,4,5,6]},
        {num:5,name:'Senate Pt 5',points:[1,2]}]
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
              />;
              
              
              <div className="boxing-div">
                  <button className="btn btn-success">Create</button>
                  <button className="btn btn-danger">Cancel</button>
              </div>
          </form>
      )
  }

   
    

      handleSenatePointClick = (e) => {
        // console.log(e.target.dataset.target.split("_"))
        this.setState({
            section:Number(e.target.dataset.target.split("_").slice(-1)),
        })
    }

    handlePreview = (e) => {
      
    }

    handlePublish = (e) => {

    }


    render() {
      return (<div className="up_hb_cont">
      <div className="col-sm-4 up_hb_menu left-pane">
        <div>
          <button onClick={this.handlePreview} className="btn btn-primary">Preview Handbook</button>
          <button onClick={this.handlePublish} className="btn btn-primary">Publish Handbook</button>
        </div>
      <h2>Senate Points</h2>
      <ul className="list-group">
            {
                this.data.map((val) => {
                    return <li data-active={this.state.section == val.num} onClick={this.handleSenatePointClick} className="list-item agenda clickable" data-target={"up_hb_sen_pt_"+val.num}>{val.name}</li>
                })
            }
      </ul>
    </div>
            
    <div className="col-sm-8 right-pane up_hb_pane">
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