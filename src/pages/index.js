import React,{ Component } from "react"
import { Link } from "gatsby"
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Button } from "@material-ui/core"
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
    }
  }
  componentDidMount(){
    var parseString = require('xml2js').parseString;
    //set your url here
    axios.get('')
      .then(response => {
        parseString(response.data, (err, result)=>  {
          console.log(result);
          this.setState({
            isLoading:false,
            stats:result
          });
        });
      })
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
          <Table aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell>
                Tracker ID
                </TableCell>
                <TableCell>{this.state.stats.stats.tracker_id}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                Torrents Count
                </TableCell>
                <TableCell>
                {this.state.stats.stats.torrents[0].count_mutex}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                Seeds
                </TableCell>
                <TableCell>
                {this.state.stats.stats.seeds[0].count}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                Completed
                </TableCell>
                <TableCell>
                {this.state.stats.stats.completed[0].count}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                TCP Connections
                </TableCell>
                <TableCell>
                {this.state.stats.stats.connections[0].tcp[0].accept} Accepted<br/>
                {this.state.stats.stats.connections[0].tcp[0].announce} Announce<br/>
                {this.state.stats.stats.connections[0].tcp[0].scrape} Scrape<br/>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
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
                <TableCell>
                Livesync Connections
                </TableCell>
                <TableCell>
                {this.state.stats.stats.connections[0].livesync[0].count}<br/>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                Debug-Renew
                </TableCell>
                <TableCell>
                {this.state.stats.stats.debug[0].renew[0].count.map((item)=>(
                  (<div>{item._}, Interval: {item.$.interval}<br/></div>)
                ))}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                Debug-HTTP Error
                </TableCell>
                <TableCell>
                {this.state.stats.stats.debug[0].http_error[0].count.map((item)=>(
                  (<div>{item._}, Interval: {item.$.code}<br/></div>)
                ))}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
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
