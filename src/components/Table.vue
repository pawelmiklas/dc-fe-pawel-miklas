<template>
  <table class="table">
    <thead>
      <th v-for="column in columns" :key="column.title">{{ column.title }}</th>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item">
        <td
          v-for="column in columns"
          :key="column.title"
          :data-label="column.title"
        >
          <div v-if="!column.customRender">
            {{ item[column.dataIndex] }}
          </div>
          <div v-else>
            <slot :name="column.customRender" :value="item" />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Table",
  props: {
    data: {
      type: Array as PropType<any[]>,
      required: true,
    },
    columns: {
      type: Array as PropType<
        {
          title: string;
          dataIndex: string;
          customRender: string;
        }[]
      >,
      required: true,
    },
    withPagination: Boolean,
  },
});
</script>

<style lang="scss">
.table {
  width: 100%;
  border-collapse: collapse;
}

.table td,
.table th {
  padding: 16px;
  border-bottom: 1px solid $gray-light;
  font-size: 16px;
  color: $gray;
}

.table th {
  background-color: rgba(229, 234, 244, 0.25);
  text-align: left;
  font-weight: 500;
  border: none;
}

@media (max-width: 820px) {
  .table thead {
    display: none;
  }

  .table,
  .table tbody,
  .table tr,
  .table td {
    display: block;
    width: 100%;
  }
  .table tr {
    margin-bottom: 15px;
  }
  .table td {
    padding-left: 50%;
    text-align: left;
    position: relative;
  }
  .table td::before {
    content: attr(data-label);
    position: absolute;
    left: 0;
    width: 50%;
    padding-left: 15px;
    font-size: 15px;
    font-weight: bold;
    text-align: left;
  }
}
</style>
