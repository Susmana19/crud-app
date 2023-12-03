<template>
  <div class="relative">
    <div class="w-[75%] mt-10 flex justify-between mx-auto">
      <button
        @click="
          router.push({
            name: 'product.add',
          })
        "
        class="w-56 text-xl font-bold py-5 hover:bg-[#FFBA33] hover:text-[#6A4029] bg-amber-900 shadow-amber-500/5 text-white rounded-lg drop-shadow-xl"
      >
        Add New Product
      </button>
    </div>
    <div class="flex flex-wrap justify-center mx-auto gap-5 w-[75vw] py-10">
      <div
        v-for="({ id, name, price, category, images }, index) in products"
        :key="index"
        class="card w-60 bg-base-100 shadow-md mx-auto shadow-amber-700 hover:scale-105 duration-500 cursor-pointer hover:bg-amber-100"
      >
        <figure>
          <img
            :src="`${imageUrl}/${images[0].filename}`"
            :alt="images[0].name"
            class="product-image w-36 h-36 rounded-full border-amber-700 border-4 mt-3 border-double"
          />
        </figure>
        <div class="card-body">
          <h2
            class="product-name card-title justify-center text-center font-poppins text-xl font-black"
          >
            {{ name }}
          </h2>
          <p
            class="product-price text-center font-semibold text-xl font-poppins"
          >
            {{ price }} K
          </p>
          <div class="card-actions justify-start">
            <div class="product-category badge badge-outline">
              {{ category }}
            </div>
          </div>
          <div class="flex justify-between mt-3">
            <button
              :id="`edit-${index}`"
              @click="
                router.push({
                  name: `product.edit`,
                  params: { id: id },
                })
              "
              class="bg-yellow-500 shadow-md hover:bg-orange-400 shadow-yellow-500/50 w-20 rounded-md px-5 py-2 text-white font-semibold"
            >
              Edit
            </button>
            <button
              @click.prevent="deleteProduct(id, index)"
              :id="`delete-${index}`"
              class="bg-red-700 shadow-md hover:bg-rose-500 shadow-red-700/70 w-20 rounded-md px-5 py-2 text-white font-semibold"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="products.length == 0"
      class="flex flex-wrap mx-auto gap-5 w-[75vw] py-10"
    >
      <div
        v-for="i in 12"
        :key="i"
        :class="{ 'animate-pulse': products.length == 0 }"
        class="card w-60 bg-base-100 shadow-md mx-auto shadow-slate-700 hover:scale-105"
      >
        <figure>
          <img
            src=""
            alt=""
            class="w-36 h-36 rounded-full bg-slate-700 border-4 mt-3 border-double"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title justify-center font-bold"></h2>
          <p class="text-center font-semibold text-lg"></p>
          <div class="card-actions justify-start">
            <div class="badge badge-outline"></div>
          </div>
          <div class="flex justify-between mt-3">
            <button class="bg-slate-700 w-20 rounded-md px-5 py-2"></button>
            <button class="bg-slate-700 w-20 rounded-md px-5 py-2"></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

onMounted(() => {
  getProducts();
});

const router = useRouter();
const products = ref([]);
const productsUrl = "http://localhost:5000/api/v1/products";
const imageUrl = "http://localhost:5000/uploads/images";

const getProducts = () => {
  axios
    .get(productsUrl)
    .then(function (response) {
      // handle success
      products.value = response.data.data;
    })
    .catch(function (error) {
      // handle error
      console.error(error);
    });
};

const deleteProduct = (id, index) => {
  axios
    .delete(`${productsUrl}/${id}`)
    .then(() => {
      products.value.splice(index, 1);
    })
    .catch((error) => {
      console.error(error);
    });
};
</script>

<style scoped></style>
