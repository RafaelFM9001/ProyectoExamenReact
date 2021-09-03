import axios from "axios";
import React from "react";
import ServiceConfig from "../Commons/ServiceConfig";

const cosa = () => {
        console.log("cosa")
}
export class SideMenu extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            types: []
        }
    }

    componentDidMount() {
        this.getTypes();
        cosa();
    }
    
    async getTypes() {
        try {
            await axios.get(ServiceConfig.getTypes).then((response) => {
                this.setState({types: response.data.results});
                console.log(response)
            }, (error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }        
    }

    render() {
        return (
            <div className="row side_menu">
                <div className="col-lg-2">
                    {this.state.types.map(type => {
                        return (
                            <p>{type.name}</p>
                        );
                    })}
                </div>
            </div>
        )
    }
}