<template>
  <footer class="flex flex-col gap-8 lg:gap-0 py-8 lg:py-0 lg:flex-row justify-between items-center px-20 lg:h-20 bg-footer">
    <a href="https://ce.asseco.com/">
      <img src="src/assets/asseco.svg" alt="Logo">
    </a>
    <p class="text-white font-light sm:text-base text-center">© All rights reserved to Asseco Central Europe 2024</p>
    <div class="flex gap-2 items-center justify-center">
      <a href="https://www.facebook.com/Asseco-Central-Europe-499069230146529/" target="_blank"
         class="border p-1.5 rounded-full size-[32px] hover:bg-neutral-600 transition">
        <img src="src/assets/icon/facebook.svg" alt="facebook">
      </a>
      <a href="https://www.linkedin.com/company/asseco-central-europe-a.s." target="_blank"
         class="border p-1.5 rounded-full size-[32px] hover:bg-neutral-600 transition">
        <img src="src/assets/icon/linkedin.svg" alt="linkedin">
      </a>
      <a href="https://x.com/Asseco_Slovakia" target="_blank"
         class="border p-2 rounded-full size-[32px] hover:bg-neutral-600 transition">
        <img src="src/assets/icon/x.svg" alt="x">
      </a>
      <a href="https://www.youtube.com/user/AssecoCE" target="_blank"
         class="border p-1.5 rounded-full size-[32px] hover:bg-neutral-600 transition">
        <img src="src/assets/icon/youtube.svg" alt="youtube">
      </a>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
}
</script>
