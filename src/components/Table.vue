<template>
  <div class="info" v-if="data.length === 0 && loading">
    Loading...
  </div>
  <div v-else>
    <table class="table">
      <template v-if="data.length > 0">
        <thead>
          <th v-for="column in columns" :key="column.title">
            {{ column.title }}
          </th>
        </thead>
        <tbody>
          <tr v-for="item in data" :key="item.id">
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
      </template>
      <div class="info" v-else>
        No data
      </div>
    </table>
  </div>
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
    loading: Boolean,
    withPagination: Boolean,
  },
});
</script>

<style lang="scss">
.info {
  width: 100%;
  text-align: center;
}

.table {
  width: 100%;
  border-spacing: 0px;
  border-collapse: separate;

  tr {
    height: 82px;
  }

  td,
  th {
    padding: 16px;
    border-bottom: 1px solid $gray-light;
    font-size: 16px;
    color: $gray;
  }

  th {
    background-color: rgba(229, 234, 244, 0.25);
    text-align: left;
    font-weight: 500;
    border: none;
  }

  @media (min-width: $lg) {
    tr td,
    thead th {
      &:first-child {
        @include wrapperGutterLeft;
      }

      &:last-child {
        @include wrapperGutterRight;
      }
    }
  }
}

@media (max-width: $lg) {
  .table {
    table-layout: auto;
    border-collapse: collapse;
    display: block;
    width: 100%;

    tr {
      height: auto;
      margin-bottom: 15px;
    }

    thead {
      display: none;
    }

    tbody,
    tr,
    td {
      display: block;
      width: 100%;
    }

    td {
      padding-left: 50%;
      text-align: left;
      position: relative;

      &::before {
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
  }
}
</style>
