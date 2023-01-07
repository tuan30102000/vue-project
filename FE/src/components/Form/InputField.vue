<template>
    <div class="form-control" :class="{ error: isFirstSubmit && errorMessage }">

        <input :type="ipType" :id="ipName + '-id'" :value="values[ipName]" @input="(e) => {
    values[ipName] = e.target.value
}" :placeholder="ipName" :name="ipName">

        <p class="error-message" v-if="isFirstSubmit">{{ errorMessage }}</p>

    </div>
</template>
<script setup>
import { computed } from 'vue';
import validateFunction from '../../validaition';
const emit = defineEmits(['changeFirtSubmit'])

const props = defineProps({
    ipType: {
        default: 'text',
        type: String
    },
    values: {
        type: Object,
    },
    ipName: String,
    validateFcs: Array,
    isFirstSubmit: {
        default: false,
        type: Boolean
    },
})
let errorMessage = computed(() => validateFunction.runError(props.values[props.ipName], props.validateFcs).message)
// function changeFirtSubmit() {
//     emit('changeFirtSubmit')
// }
</script>
<style lang="scss">
::-webkit-input-placeholder {
    text-transform: capitalize;
}

:-moz-placeholder {
    text-transform: capitalize;
}

::-moz-placeholder {
    text-transform: capitalize;
}

:-ms-input-placeholder {
    text-transform: capitalize;
}

.form-control {
    border: 1px solid black;
    border-radius: 6px;
    width: 100%;
    height: 52px;
    margin-bottom: 30px;
    flex-direction: column;
    padding: 6.5px 11px;
    position: relative;

    &.error {
        border-color: red;
    }

    label {
        display: block;
        text-transform: capitalize;
    }

    input {
        outline: none;
        border: none;
        margin-left: 3px;
        font-size: 18px;
        height: 100%;
        width: 100%;

        :placeholder-shown {
            text-transform: capitalize;
        }
    }

    .error-message {
        position: absolute;
        top: 100%;
        font-size: 13px;
        color: red;
        font-weight: 500;
    }
}
</style>