import { ref, computed } from 'vue'

const user = ref(null) // 🔥 estado global (singleton)

export function userAuth() {

  // cargar desde storage
  const loadUser = () => {
    const data = localStorage.getItem('user')
    if (data) user.value = JSON.parse(data)
  }

  // guardar usuario
  const setUser = (newUser) => {
    user.value = newUser
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  // logout
  const logout = () => {
    user.value = null
    localStorage.removeItem('user')
  }

  // estado derivado
  const isLogged = computed(() => !!user.value)

  return {
    user,
    isLogged,
    setUser,
    logout,
    loadUser
  }
}