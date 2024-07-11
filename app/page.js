export default function Home() {
  return (
<>
<header class="bg-red-500 shadow-md">
    <h1 class="text-3xl font-bold text-center py-6 text-white">Welcome to My Website</h1>
  </header>
  
  <main class="container mt-8 bg-green-500">
    <div class="bg-blue-600 text-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold">Main Content</h2>
      <p class="mt-4">This is an example of a container with customized settings in Tailwind CSS.</p>
    </div>
  </main>

  <footer class="container bg-yellow-500 shadow-md mt-8 py-6">
    <p class="text-center text-gray-800">© 2024 My Website. All rights reserved.</p>
  </footer>
</>
  );
}
