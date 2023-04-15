import { Component } from "react";


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





// export function


class UpdateHandbook extends Component {
    constructor(props){
        super(props);
        this.state = {section:0,point:0,sen_pt:0}
        this.data = [{num:1,name:'Agenda 1',points:[
            {num:1,changes:[
                {when:"51st Senate Meeting",change:"SFDSFSDGDFGHFDGFDG"},
                {when:"49st Senate Meeting",change:";lkSFsdfsdfsdfsdfsdfDG"},
                {when:"48st Senate Meeting",change:"jkkSsdfsdfsdfsdfsdfsdfsfsdfsdfGFDG"},
                {when:"46st Senate Meeting",change:"sdfsdfSsdfsdfdsfsdfsdfsdfDG"},
            ]},
            {num:2,changes:[
                {when:"53st Senate Meeting",change:"sfsdSFDSFSDGDFGHFDGFDG"},
                {when:"48st Senate Meeting",change:"QQRWasdasdasdasdasSDAFSASDFfDG"},
                {when:"47st Senate Meeting",change:"QWRWQRSDFGSDFSDFSsdfsdfsdSDFSDFSDfsdfsdfsdfsfsdfsdfGFDG"},
                {when:"45st Senate Meeting",change:"FDHHDFGHSsdfsdfdsfsdfsdfsdfDG"},
            ]},
            {num:3,changes:[{when:"51st Senate Meeting",change:"SFDSFSDGDFGHFDGFDG"}]},
            {num:4,changes:[{when:"51st Senate Meeting",change:"SFDSFSDGDFGHFDGFDG"}]},
            {num:5,changes:[{when:"51st Senate Meeting",change:"SFDSFSDGDFGHFDGFDG"}]},
        ]},
        {num:2,name:'Agenda 2',points:[1,2,3]},
        {num:3,name:'Agenda 3',points:[1,2,3,4]},
        {num:4,name:'Agenda 4',points:[1,2,3,4,5,6]},
        {num:5,name:'Agenda 5',points:[1,2]}]
    }

    
    UpdateHandbookForm = (props) => {
      return (
          <form className="up_hb_form">
              <label for="up_hb_prop" class="form-label">Proposal</label>
              <input readOnly={true} type="text" class="form-control" id="up_hb_prop" placeholder="Proposal for the Senate Point"></input>
              <label for="up_hb_res" class="form-label">Resolution</label>
              <input readOnly={true} type="text" class="form-control" id="up_hb_res" placeholder="Resolution for the Senate Point"></input>
              <div>
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
  
              <textarea placeholder={
                (this.state.section != 0 && this.state.point !=0) ? 
                (props.hb_data[this.state.section][this.state.point]) : ("Please Select a Section and a Point")
              }></textarea>
              
              <div>
                  <button className="btn btn-success">Create</button>
                  <button className="btn btn-danger">Cancel</button>
              </div>
          </form>
      )
  }

   
    

    handleSenatePointClick = (e) => {
        // console.log(e.target.dataset.target.split("_"))
        this.setState({
            sen_pt:Number(e.target.dataset.target.split("_").slice(-1)),
            section:0,
            point:0
        })
    }


    render() {
      return (<div className="row">
      <div className="col-sm-4 agenda-menu left-pane pt-5 pl-5">
      <h2>Senate Points</h2>
      <ul className="list-group">
            {
                this.data.map((val) => {
                    return <li onClick={this.handleAgendaClick} className="list-item agenda clickable" data-target={"agenda_"+val.num}>{val.name}</li>
                })
            }
      </ul>
    </div>

    <div className="col-sm-8 changes-data pt-5">
        <this.UpdateHandbookForm hb_data={[["fgsdgdfgfgdfgfgd","dfgdfgdfgdfgdfg","asdasddfghhkjjhg"], ["fasdgsdgdfgfgdfgfgd","uiouidfgdfgdfgdfgdfg","atyutysdasddfghhkjjhg"], ["utyrtyfgsdgdfgfgdfgfgd","bvnbvndfgdfgdfgdfgdfg","hjkjasdasddfghhkjjhg"]]} sections={[{value:1,text:"Point 1: dfgfdgdf"},{value:2,text:"Point 2: hjkdfgfdhjkhgdf"},{value:3,text:"Point 3: jkkdfgfdgdf"}]} points={[{value:1,text:"Section 1: dfgfdgdf"},{value:2,text:"Section 2: hjkdfgfdhjkhgdf"},{value:3,text:"Section 3: jkkdfgfdgdf"}] }/>
      {/* <pointHistory className="test">Hello</pointHistory> */}
      {this.data.map((val) => {
        return (
            val.points.map((pt) => {
                return (
                    this.state.agenda == val.num && this.state.point == pt.num &&
                    pt.changes.map((ch) => {
                        return (
                            <PointHistory when={ch.when} change={ch.change}></PointHistory>
                        )
                    })
                )
            })
        )
      })}

    </div>
</div>);
    }
  }
  export default UpdateHandbook;