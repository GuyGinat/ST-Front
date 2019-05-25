<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs6>
        <v-card dark min-height="200px">
          <input type="file" @change="OnStyleSelected">
          <input type="file" @change="OnContentSelected">
        </v-card>
        
      </v-flex>      
      <div>
        <v-btn @click="GetStuff()">Do Something</v-btn>
        <v-btn @click="SubmitImages">Post Images</v-btn>
        <h3>{{stuff}}</h3>
        <img v-bind:src="outputImage" v-show="showPreview"/>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  props: {},
  data() {
    return {
      hasContentImage: false,
      hasStyleImage: false,
      contentImage: null,
      styleImage: null,
      outputImage: null,
      showPreview: false,
      stuff: "",
    };
  },
  methods: {
    async GetStuff() {
      let config = {
        headers: {
          Accept: "application/json"
        }
      };
      axios
        .get("http://localhost:5000/api/image", config)
        .then(res => {
          console.log(res);
          this.stuff = res.data;
        })
        .catch(err => console.log(err));
      // const stuff = await axios.get('https://localhost:5000/api/people', config);
      // this.stuff = stuff.data.joke
    },
    OnFileSelected(event) {
      console.log(event.target.files[0]);
      // this.selectedImage = event.target.files[0]
    },
    OnContentSelected(event) {
        this.contentImage = event.target.files[0]
        this.hasContentImage = true
    },    
    OnStyleSelected(event) {
      this.styleImage = event.target.files[0]
      this.hasStyleImage = true      
    },
    SubmitImages() {
        if (!this.hasContentImage || !this.hasStyleImage) {
            alert("Nope")
            return
        }
        let formData = new FormData();
        formData.append("content", this.contentImage)
        formData.append("style", this.styleImage)
        axios.post("http://localhost:5000/api/image", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {
          console.log(res)
          console.log(contentImage)
          this.outputImage = res
        })
        .catch(err => console.log(err))
    }
  }
};
</script>
<style>
#fileContentInput {
  padding: 16px;
  display: none;
}
#fileStyleInput {
  padding: 16px;
  display: none;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.my-8 {
  margin-top: 4rem;
  margin-bottom: 4rem;
}
</style>


