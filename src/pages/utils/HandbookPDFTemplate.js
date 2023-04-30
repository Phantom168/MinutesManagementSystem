import React,{Component} from 'react';
var parse = require('html-react-parser');

class HandbookPDFTemplate extends Component{
    constructor(props) {
        super(props);
    }


    styles = {
        page:{
            width:"75%",
            margin:"auto",
            padding:"96px 0"
        },
        section:{
            color:"#7030a0",
            margin:"auto",
            marginBottom:"10px",
        },
        section_cont:{
            textAlign:"center"
        },
        sub_heading:{
            color:"#7030a0",
        },
        pt_content:{
            marginBottom:"48px",
        },
        pt_content_for_last_pt:{
            marginBottom:"96px",
        }
    }



    render() {
    let styles=this.styles;
    let hb = this.props.hb
    
    return (<div className="hb-pdf" style={this.styles.page} >
        {
            hb.map((section, sec_idx) => {
                return (<div>
                    <div style={styles.section_cont}>
                        <h5 style={styles.section}>{section.name}</h5>
                    </div>
                    {section.points.map((pt, pt_idx) => {
                        return (<>
                                    <h6 style={styles.sub_heading}>{sec_idx + 1}.{pt_idx +1}</h6>
                                    <p style={pt_idx !== section.points.length -1 ? 
                                        styles.pt_content : 
                                        styles.pt_content_for_last_pt}>
                                    {parse(pt.text)}</p>
                            </>);
                    })}
                </div>)
                })
        }
    
    </div>)}



}

export default HandbookPDFTemplate;