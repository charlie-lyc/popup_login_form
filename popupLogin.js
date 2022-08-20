import rotaryMembers from './rotary.js'

/* Modal */
const modal = document.getElementById('simpleModal')
const openModal = () => modal.style.display = 'block'
const closeModal = () => modal.style.display = 'none'

/* Popup login form */
const getIdPass = () => {
    const memberId = sessionStorage.getItem('memberId')
    const memberPass = sessionStorage.getItem('memberPass')
    return { memberId, memberPass }
}
const setIdPass = () => {
    sessionStorage.setItem('memberId', document.getElementById('memberId').value)
    sessionStorage.setItem('memberPass', document.getElementById('memberPass').value)
}
const verifyIdPass = (id, pass) => {
    const foundMember = rotaryMembers.find(member => (member.rotaryId).toString() === id) || rotaryMembers.find(member => member.phone.split('-')[1] + member.phone.split('-')[2] === id)
    if (foundMember) {
        if (foundMember.phone.split('-')[2] === pass) {
            return true
        } else {
            alert('비밀 번호가 일치하지 않습니다.')
            return false
        }
    } else {
        alert('회원 아이디가 일치하지 않습니다.')
        return false
    }
}
const loginBtn = document.querySelector('.btn.submit')
loginBtn.addEventListener('click', () => {
    setIdPass()
    const rotary = getIdPass()
    const result = verifyIdPass(rotary.memberId, rotary.memberPass)
    if (result) {
        location.href = '../main/html.php?htmid=proc/rotaryProfiles.html'
    } else {
        document.getElementById('memberId').value = ''
        document.getElementById('memberPass').value = ''
        sessionStorage.clear()
    }
})
const cancelBtn = document.querySelector('.btn.cancel')
cancelBtn.addEventListener('click', () => {
    document.getElementById('memberId').value = ''
    document.getElementById('memberPass').value = ''
    sessionStorage.clear()
    history.back()
})

/* Processing */
let rotary = getIdPass()
if (!rotary.memberId || !rotary.memberPass) {
    openModal()
} else {
    const result = verifyIdPass(rotary.memberId, rotary.memberPass)
    if (!result) openModal()
}