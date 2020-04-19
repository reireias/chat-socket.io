<template>
  <v-container class="chat-page">
    <v-row justify="center">
      <v-col>
        <center>
          <div v-if="room" class="display-1">Room: {{ room.name }}</div>
        </center>
      </v-col>
    </v-row>
    <v-row v-for="message in messages" :key="message.id" justify="center">
      <v-col
        :class="user.id == message.author ? 'my-message' : 'other-message'"
        cols="12"
        md="8"
        xl="5"
      >
        <v-avatar v-if="user.id != message.author">
          <img :src="message.authorIcon" />
        </v-avatar>
        <v-card
          class="message-card"
          :color="user.id == message.author ? '#AED581' : 'white'"
        >
          <v-card-title v-text="message.text"></v-card-title>
        </v-card>
        <v-avatar v-if="user.id == message.author">
          <img :src="message.authorIcon" />
        </v-avatar>
      </v-col>
    </v-row>
    <v-app-bar app bottom fixed height="80">
      <v-container style="padding: 0; margine: 0;">
        <v-row justify="center" align="center">
          <v-col cols="11" md="7" xl="4">
            <v-text-field
              v-model="text"
              solo
              hide-details
              placeholder="message"
              @keyup.enter="onPost"
            ></v-text-field>
          </v-col>
          <v-col cols="1">
            <v-btn fab elevation="3" color="primary" @click="onPost">
              <v-icon>mdi-send</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </v-container>
</template>

<script>
import io from 'socket.io-client'
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'

export default {
  data() {
    return {
      text: null,
      socket: null,
      messages: [],
    }
  },
  computed: {
    ...mapGetters(['user', 'room']),
  },
  created() {
    this.socket = io()
    this.socket.emit('join-room', {
      id: this.user.id,
      roomId: this.$route.query.roomId,
    })
    this.socket.on('send-message', this.recieveMessage)
    this.getRoom({ id: this.$route.query.roomId })
    this.initMessages()
  },
  methods: {
    recieveMessage(message) {
      this.messages.push(message)
    },
    onPost() {
      if (this.text) {
        const message = {
          author: this.user.id,
          authorIcon: this.user.picture,
          text: this.text,
          roomId: this.$route.query.roomId,
        }
        this.socket.emit('send-message', message)
        this.text = null
      }
    },
    format(timestamp) {
      return moment(timestamp.seconds * 1000).format('YYYY/MM/DD HH:mm:ss')
    },
    ...mapActions(['getRoom']),
  },
}
</script>

<style lang="scss">
.chat-page {
  .my-message {
    display: flex;
    align-items: center;
    .message-card {
      margin-left: auto;
    }
  }
  .other-message {
    display: flex;
    align-items: center;
  }
  .message-card {
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>
