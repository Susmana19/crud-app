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
        ADD NEW PRODUCT
      </h1>
    </div>
    <!-- Form Add Product -->
    <form
      @submit.prevent="addProduct"
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

      <!-- form section -->
      <div class="w-[50%]">
        <div class="flex flex-col gap-10">
          <div class="flex flex-col gap-3">
            <label for="product-name" class="text-2xl font-semibold"
              >Name :</label
            >

            <input
              v-model="inputName"
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
              v-model="inputPrice"
              type="number"
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
              @change="selectedCategory"
              id="product-category"
              class="select select-bordered w-full max-w-xs text-xl"
            >
              <option disabled selected class="text-xl">Choose Category</option>
              <option value="coffee" class="text-xl">Coffee</option>
              <option value="non-coffee" class="text-xl">Non Coffee</option>
              <option value="foods" class="text-xl">Food</option>
              <option value="add-on" class="text-xl">Add On</option>
            </select>

            <button
              id="form-submit"
              type="submit"
              class="text-center cursor-pointer hover:text-[#6A4029] hover:bg-[#FFBA33] px-5 py-3 text-xl font-bold rounded-md bg-[#6A4029] text-[#FFBA33]"
            >
              Save Product
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

let inputName = ref("");
let inputPrice = ref("");
let inputCategory = ref("");
let inputImage = ref("");
let previewImage = ref("");

let newProduct = ref({
  name: "",
  price: "",
  category: "",
  image: "",
});

watch(inputName, (value) => {
  newProduct.value.name = value;
});
watch(inputPrice, (value) => {
  newProduct.value.price = value;
});
watch(inputCategory, (value) => {
  newProduct.value.category = value;
});
watch(inputImage, (value) => {
  newProduct.value.image = value;
});

const uploadImage = (event) => {
  inputImage.value = event.target.files[0];
  previewImage.value = URL.createObjectURL(event.target.files[0]);
};

const selectedCategory = (event) => {
  inputCategory.value = event.target.value;
};

const addProduct = async (event) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append("name", newProduct.value.name);
  formData.append("price", newProduct.value.price);
  formData.append("image", newProduct.value.image);
  formData.append("category", newProduct.value.category);

  if (
    newProduct.value.name === "" ||
    newProduct.value.price === "" ||
    newProduct.value.category === "" ||
    newProduct.value.image === ""
  ) {
    return alert("All data is Required");
  }

  const urlProduct = "http://localhost:5000/api/v1/products";

  try {
    await axios.post(urlProduct, formData);
    router.push({
      name: "product.index",
    });
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped></style>
