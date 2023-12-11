<template>
  <div v-if="show" class="modal-overlay" @click.self="closeModal">
    <div
      class="modal-content bg-ffe-off-white relative w-10/12 tablet:min-w-[500px]"
    >
      <slot></slot>
      <button @click="closeModal" class="absolute top-2 right-2">
        <IconClose />
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
});

const emit = defineEmits(["update:show"]);

const closeModal = () => {
  emit("update:show", false);
};
</script>

<style scoped>
.modal-overlay {
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
}
</style>
