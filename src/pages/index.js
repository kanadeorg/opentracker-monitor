import React,{ Component } from "react"
import { Link } from "gatsby"
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Button, Input } from "@material-ui/core"
import Slider from '@material-ui/core/Slider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

class index extends Component {
  constructor(porps){
    super(porps);
    this.state = {
      isLoading:true,
      stats:null,
      delay: 5000
    }
  }
  tick = ()=>{
    var parseString = require('xml2js').parseString;
    axios.get('').then(response => {
      parseString(response.data, (err, result)=>{
        this.setState({
          stats:result
        });
      });
    })
  }
  updateInterval = (event, value) =>{
    if(value==0){
      this.setState({
        delay:11451400,
      });
    }else{
      this.setState({
        delay:value*1000
      })
    }
  }
  componentDidUpdate(prevProps, prevState){
    if(prevState.delay!=this.state.delay){
      clearInterval(this.interval);
      this.interval = setInterval(this.tick, this.state.delay);
    }
  }
  componentWillUnmount(){
    clearInterval(this.interval);
  }
  componentDidMount(){
    var parseString = require('xml2js').parseString;
    this.interval = setInterval(this.tick, this.state.delay);
    //set your url here
    axios.get('').then(response => {
        parseString(response.data, (err, result)=>{
          console.log(result);
          this.setState({
            isLoading:false,
            stats:result
          });
        });
      })
    }
  valuetext = (value)=>{
    return `${value}(s) 秒`
  }
  render() {
    if(this.state.isLoading){
      return (
          <div Style="text-align:center;width:100%;">
            <CircularProgress color="secondary" />
          </div>
        )
    }else
    return (
      <div>
        <Container Style="margin-top:100px;margin-bottom:100px;">
          <TableContainer Style="width:75%;margin: auto;" component={Paper}>
          <Slider
          Style="margin-top:50px;margin-left:3%;margin-right:3%;width:94%"
          defaultValue={5}
          getAriaValueText={this.valuetext}
          aria-labelledby="interval-slider"
          valueLabelDisplay="auto"
          onChange={this.updateInterval}
          min={0}
          max={100}
        />
          <Table aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell align="right">
                Tracker ID
                </TableCell>
                <TableCell>{this.state.stats.stats.tracker_id}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">
                Uptime
                </TableCell>
                <TableCell>
                {Math.floor(this.state.stats.stats.uptime[0]/3600)} Hours
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">
                Peers
                </TableCell>
                <TableCell>
                {this.state.stats.stats.peers[0].count[0]}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">
                Torrents Count
                </TableCell>
                <TableCell>
                {this.state.stats.stats.torrents[0].count_mutex}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">
                Seeds
                </TableCell>
                <TableCell>
                {this.state.stats.stats.seeds[0].count}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">
                Completed
                </TableCell>
                <TableCell>
                {this.state.stats.stats.completed[0].count}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">
                TCP Connections
                </TableCell>
                <TableCell>
                {this.state.stats.stats.connections[0].tcp[0].accept} Accepted<br/>
                {this.state.stats.stats.connections[0].tcp[0].announce} Announce<br/>
                {this.state.stats.stats.connections[0].tcp[0].scrape} Scrape<br/>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">
                UDP Connections
                </TableCell>
                <TableCell>
                {this.state.stats.stats.connections[0].udp[0].connect} Connected<br/>
                {this.state.stats.stats.connections[0].udp[0].announce} Announce<br/>
                {this.state.stats.stats.connections[0].udp[0].scrape} Scrape<br/>
                {this.state.stats.stats.connections[0].udp[0].missmatch} Miss Match<br/>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">
                Livesync Connections
                </TableCell>
                <TableCell>
                {this.state.stats.stats.connections[0].livesync[0].count}<br/>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">
                Debug-Renew
                </TableCell>
                <TableCell>
                {this.state.stats.stats.debug[0].renew[0].count.map((item)=>(
                  (<div>{item._}, Interval: {item.$.interval}<br/></div>)
                ))}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">
                Debug-HTTP Error
                </TableCell>
                <TableCell>
                {this.state.stats.stats.debug[0].http_error[0].count.map((item)=>(
                  (<div>{item._}, Interval: {item.$.code}<br/></div>)
                ))}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">
                Debug-Mutex Stall
                </TableCell>
                <TableCell>
                {this.state.stats.stats.debug[0].mutex_stall[0].count[0]}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      </div>
    )
  }
}
export default index;
