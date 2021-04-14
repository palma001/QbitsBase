<template>
  <li>
    <div>
      <div
        style="display:inline-block"
        :class="{bold: isFolder}"
        @click="toggle"
        @dblclick="changeType"
      >
        <span v-if="isFolder">
          <i v-if="open" class="fa fa-minus-square" aria-hidden="true"></i>
          <i v-else class="fa fa-plus-square" aria-hidden="true"></i>
        </span>
        "{{Object.keys(model)[0]}}" : "
      </div>
      <input type="text" v-model="model[Object.keys(model)[0]]" :size="model.name.length">"
      <span class="deleteBtn">
        <i class="fa fa-trash" aria-hidden="true"></i>
      </span>
    </div>
    <ul v-show="open" v-if="isFolder">
      <tree class="item" v-for="(model, index) in model.children" :key="index" :model="model"></tree>
      <li class="add" @click="addChild">
        <i class="fa fa-plus" aria-hidden="true"></i>
      </li>
    </ul>
  </li>
</template>
<script>
import Vue from 'vue'
export default {
  name: 'Tree',
  props: {
    model: Object
  },
  data: () => {
    return {
      open: false
    }
  },
  computed: {
    isFolder () {
      return this.model.children && this.model.children.length
    }
  },
  methods: {
    toggle () {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    changeType () {
      if (!this.isFolder) {
        Vue.set(this.model, 'children', [])
        this.addChild()
        this.open = true
      }
    },
    addChild () {
      this.model.children.push({
        name: 'new stuff'
      })
    }
  }
}
</script>
<style>
.item {
  cursor: pointer;
}
.bold {
  font-weight: bold;
}
ul {
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: none;
}
input {
  background: transparent;
  border: 1px transparent solid;
  color: inherit;
  cursor: text;
  font-family: monospace;
  font-size: 14px;
  line-height: 14px;
  outline: none;
  padding: 2px;
}
input:hover {
  border-color: #333;
}
input:focus {
  border-color: #333;
}
.fa {
  cursor: pointer;
}
.deleteBtn {
  margin-left: 10px;
}
</style>
