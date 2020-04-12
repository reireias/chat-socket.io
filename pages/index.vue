<template>
  <v-container class="index-container">
    <v-row justify="center">
      <v-col>
        <div class="display-3 index-title">Create Room</div>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="2">
        <v-text-field
          ref="nameField"
          v-model="name"
          label="Name"
          :rules="[rules.required]"
        ></v-text-field>
      </v-col>
      <v-col class="index-content" cols="2">
        <v-btn color="primary" :disabled="!name" @click="onCreate"
          >create</v-btn
        >
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <div class="display-3 index-title">Join a Room</div>
      </v-col>
    </v-row>
    <v-row v-if="loading" justify="center" align="center">
      <v-col class="index-content">
        <v-progress-circular
          indeterminate
          size="50"
          color="primary"
        ></v-progress-circular>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="4">
        <v-list>
          <v-list-item v-if="rooms.length == 0">
            <v-list-item-subtitle class="text-center"
              >no rooms</v-list-item-subtitle
            >
          </v-list-item>
          <v-list-item v-for="room in rooms" :key="room.name">
            <v-list-item-title
              class="display-1"
              v-text="room.name"
            ></v-list-item-title>
            <v-list-item-action class="room-action-button">
              <v-btn outlined nuxt :to="`/chat?roomId=${room.id}`">join</v-btn>
            </v-list-item-action>
            <v-list-item-action class="room-action-button">
              <v-btn outlined @click="onDelete(room)">delete</v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      name: undefined,
      rules: {
        required: (value) => !!value || 'Required',
      },
    }
  },
  computed: {
    ...mapGetters(['user', 'loading', 'rooms']),
  },
  created() {
    // TODO: get rooms
  },
  methods: {
    onCreate() {
      this.addRoom({ uid: this.user.uid, name: this.name })
      this.name = null
    },
    onDelete(room) {
      this.deleteRoom({ uid: this.user.uid, id: room.id })
    },
    ...mapActions(['addRoom', 'deleteRoom']),
  },
}
</script>

<style lang="scss">
.index-container {
  .index-title,
  .index-content {
    text-align: center;
  }
  .room-action-button {
    margin-left: 15px;
    margin-right: 15px;
  }
}
</style>
