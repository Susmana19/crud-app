<template>
  <div class="w-[90%] mt-10 flex justify-between mx-auto">
    <router-link :to="{ name: 'product.add' }">
      <button
        class="w-56 text-xl font-semibold bg-amber-900 shadow-amber-500/5 text-white rounded-lg drop-shadow-xl"
      >
        Add New Product
      </button>
    </router-link>

    <input
      type="text"
      placeholder="Search here"
      class="input input-bordered w-full max-w-xs input-warning border-yellow-500 font-semibold"
    />
    <div class="flex w-[22%] items-center">
      <label for="" class="w-[50%]">Sort By : </label>
      <select class="select select-warning w-full max-w-xs">
        <option disabled selected>Choose Sort Type</option>
        <option>A-Z</option>
        <option>Price</option>
        <option>Category</option>
      </select>
    </div>
  </div>
  <div class="flex flex-wrap mx-auto gap-5 w-[75vw] py-10">
    <div
      v-for="({ name, price, category, images }, index) in products"
      :key="index"
      class="card w-60 bg-base-100 shadow-md mx-auto shadow-amber-700"
    >
      <figure>
        <img
          :src="`${imageUrl}/${images[0].filename}`"
          :alt="images[0].name"
          class="w-36 h-36 rounded-full border-amber-700 border-4 mt-3 border-double"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title justify-center font-bold">{{ name }}</h2>
        <p class="text-center font-semibold text-lg">{{ price }} K</p>
        <div class="card-actions justify-start">
          <div class="badge badge-outline">{{ category }}</div>
        </div>
        <div class="flex justify-between mt-3">
          <button
            class="bg-yellow-500 shadow-md hover:bg-orange-400 shadow-yellow-500/50 w-20 rounded-md px-5 py-2 text-white font-semibold"
          >
            Edit
          </button>
          <button
            class="bg-red-700 shadow-md hover:bg-rose-500 shadow-red-700/70 w-20 rounded-md px-5 py-2 text-white font-semibold"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
