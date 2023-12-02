<template>
  <div>
    <div class="flex items-center w-[80%] mx-auto">
      <button
        @click="router.push({ name: 'product.index' })"
        class="w-24 bg-[#FFBA33] text-[#6A4029] h-10 rounded-lg text-xl font-bold"
      >
        Back
      </button>
      <h1 class="text-center my-16 font-bold text-3xl ms-[45%]">
        EDIT PRODUCT
      </h1>
    </div>
    <!-- Form Edit Product -->
    <form
      @submit.prevent="editProduct"
      class="flex w-[90%] mx-auto justify-evenly"
    >
      <!-- Upload Image Section -->
      <div class="flex flex-col gap-10">
        <img
          v-if="previewImage"
          :src="previewImage"
          class="w-[20vw] rounded-full"
        />
        <img v-else src="../../assets/upload-image.jpg" class="w-[20vw]" />
        <label
          for="product-image"
          class="text-center cursor-pointer text-[#6A4029] bg-[#FFBA33] px-5 py-3 text-xl font-bold rounded-md hover:bg-[#6A4029] hover:text-[#FFBA33]"
          >Choose From Gallery</label
        >
        <input
          @change="uploadImage"
          type="file"
          id="product-image"
          class="hidden"
        />
      </div>

      <!-- form Section-->
      <div class="w-[50%]">
        <div class="flex flex-col gap-10">
          <div class="flex flex-col gap-3">
            <label for="product-name" class="text-2xl font-semibold"
              >Name :</label
            >

            <input
              v-model="name"
              type="text"
              name=""
              id="product-name"
              class="border-b-2 border-[#4F5665] text-xl py-2 focus:outline-none"
              placeholder="Type a product name"
            />
          </div>
          <div class="flex flex-col gap-3">
            <label for="product-price" class="text-2xl font-semibold"
              >Price :</label
            >
            <input
              v-model="price"
              type="text"
              name=""
              id="product-price"
              class="border-b-2 border-[#4F5665] text-xl py-2 focus:outline-none"
              placeholder="Type the price in thousand (K)"
            />
          </div>
          <div class="flex flex-col gap-5">
            <label for="product-category" class="text-2xl font-semibold"
              >Select Category :</label
            >
            <select
              v-model="category"
              class="select select-bordered w-full max-w-xs text-xl"
            >
              <option disabled selected class="text-xl">Choose Category</option>
              <option value="coffee" class="text-xl">Coffee</option>
              <option value="non-coffee" class="text-xl">Non Coffee</option>
              <option value="foods" class="text-xl">Food</option>
              <option value="add-on" class="text-xl">Add On</option>
            </select>
            <button
              type="submit"
              class="text-center cursor-pointer hover:text-[#6A4029] hover:bg-[#FFBA33] px-5 py-3 text-xl font-bold rounded-md bg-[#6A4029] text-[#FFBA33]"
            >
              Edit Product
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";

onMounted(() => {
  getProductById();
});

const router = useRouter();
const route = useRoute();
const id = route.params.id;

let name = ref("");
let price = ref("");
let category = ref("");
let image = ref("");
let previewImage = ref("");

let newProduct = ref({
  name: "",
  price: "",
  category: "",
  image: "",
});

watch(name, (value) => {
  newProduct.value.name = value;
  console.log(value);
});
watch(price, (value) => {
  newProduct.value.price = value;
});
watch(category, (value) => {
  newProduct.value.category = value;
});
watch(image, (value) => {
  newProduct.value.image = value;
});

const getProductById = async () => {
  const response = await axios.get(
    `http://localhost:5000/api/v1/products/${id}`
  );
  name.value = response.data.data.name;
  price.value = response.data.data.price;
  category.value = response.data.data.category;

  const res = await axios.get("http://localhost:5000/api/v1/products/");
  const dataImage = res.data.data;

  dataImage.map((item) => {
    if (item.id === id) {
      return (previewImage.value = `http://localhost:5000/uploads/images/${item.images[0].filename}`);
    }
  });
};

const uploadImage = (event) => {
  image.value = event.target.files[0];
  previewImage.value = URL.createObjectURL(event.target.files[0]);
};

const editProduct = async (event) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append("name", newProduct.value.name);
  formData.append("price", newProduct.value.price);
  formData.append("image", newProduct.value.image);
  formData.append("category", newProduct.value.category);

  const urlProduct = "http://localhost:5000/api/v1/products";

  try {
    await axios.patch(`${urlProduct}/${id}`, formData);
    router.push({
      name: "product.index",
    });
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped></style>
