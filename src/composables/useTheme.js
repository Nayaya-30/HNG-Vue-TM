import { ref, watch } from 'vue'

export function useTheme(){
  const dark = ref(JSON.parse(localStorage.getItem('darkMode')||'false'))
  watch(dark, (v)=>{
    localStorage.setItem('darkMode', JSON.stringify(v))
    if(v) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, { immediate: true })
  const toggle = ()=> dark.value = !dark.value
  return { dark, toggle }
}
