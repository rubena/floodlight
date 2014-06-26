/*
   Copyright 2012 IBM

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

window.Loadbalancer = Backbone.Model.extend({

    urlvip: "/quantum/v1.0/vips/",
    urlmember:"/quantum/v1.0/members/",
    
    defaults:{
        address: [],
        port: [],
    },

    initialize:function () {
        var self = this;
        console.log("fetching loadbalancer")
        $.ajax({
            url:hackBase + self.urlvip,
                  dataType:"json",
                  success:function (data) {
                      console.log("fetched loadbalancer: " + data.length);
                      // console.log(data);
                      //self.address = {};
                      //self.port = [];
                      var i=1;
                      var cadena = '<div id="demo' + i +'"></div>'
                      for (i; i<=data.length; i++){
                          cadena = cadena + '<div id="demo' + i +'"></div>';
                      }
                      console.log("Cadena: " + cadena);
                      document.getElementById("demo").innerHTML = cadena;
                      i=1;
                      _.each(data, function(v) {
                          console.log("fetched VIP Address: " + v.address);
                          console.log("fetched VIP id: " + v.id);
                          

                          $.ajax({
                              url:hackBase + self.urlmember,
                              dataType:"json",
                              success:function (data) {
                                  console.log("fetched loadbalancer: " + data.length);
                                  // console.log(data);
                                  //self.address = {};
                                  //self.port = [];

                                  
                                  cadena = '<h2>VIP id: ' + v.id + ' IP Address: [' + v.address + ']</h2><table class="table table-striped loadbalancer-table"><tbody><tr><th>IP Address</th><th>Port</th><th>Free CPU</th><th>Free Memory</th><th>Status</th></tr>';
                                  console.log("cadena 1: " + cadena);

                                  _.each(data, function(h) {
                                    console.log("fetched address: " + h.address);
                                    console.log("fetched port: " + h.port);
                                      //h.id = h.mac[0];
                                      //console.log("fetched data");
                                      // old_ids = _.without(old_ids, h.id);
                                      // if (h['attachmentPoint'].length > 0) {
                                      //     h.swport = _.reduce(h['attachmentPoint'], function(memo, ap) {
                                      //         return memo + ap.switchDPID + "-" + ap.port + " "}, "");
                                      //     //console.log(h.swport);
                                      //     h.lastSeen = new Date(h.lastSeen).toLocaleString();
                                           //self.add(h, {silent: true});
                                      // }
                                      if (v.id == h.vipId){
                                       cadena = cadena + "<tr><th>" + h.address + "</th><th>" + h.port + "</th><th>" + h.freecpu + "</th><th>" + h.freememory + "</th><th>OK</th></tr>";

                                      }
                                      
                                  });

                                  cadena = cadena + "</tbody></table>"
                                  document.getElementById("demo" + v.id).innerHTML = cadena;
                                  // step 1: build unique array of switch IDs
                                  /* this doesn't work if there's only one switch,
                                     because there are no switch-switch links
                                  _.each(data, function (l) {
                                      self.nodes[l['src-switch']] = true;
                                      self.nodes[l['dst-switch']] = true;
                                  });
                                  // console.log(self.nodes);
                                  var nl = _.keys(self.nodes);
                                  */
                                  /*
                                  var nl = swl.pluck('id');
                                  self.nodes = _.map(nl, function (n) {return {name:n}});

                                  // step 2: build array of links in format D3 expects
                                  _.each(data, function (l) {
                                      self.links.push({source:nl.indexOf(l['src-switch']),
                                                       target:nl.indexOf(l['dst-switch']),
                                                       value:10});
                                  });
                                  // console.log(self.nodes);
                                  // console.log(self.links);
                                  self.trigger('change');
                                  //self.set(data);
                                  */
                              }
                          });
                          i++;












                      });
                    }





        });
              
    }

});