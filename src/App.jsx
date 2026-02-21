import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [n1, setN1] = useState('')
  const [n2, setN2] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSomme = async () => {
    if (!n1 || !n2) {
      setResult('Veuillez remplir les deux champs')
      return
    }
    
    setLoading(true)
    try {
      const response = await axios.post('https://node-somme.vercel.app/api/calculs/somme', {
        n1: parseFloat(n1),
        n2: parseFloat(n2)
      })
      setResult(response.data.result)
    } catch (error) {
      setResult('Erreur lors du calcul: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleProduit = async () => {
    if (!n1 || !n2) {
      setResult('Veuillez remplir les deux champs')
      return
    }
    
    setLoading(true)
    try {
      const response = await axios.post('https://node-somme.vercel.app/api/calculs/produit', {
        n1: parseFloat(n1),
        n2: parseFloat(n2)
      })
      setResult(response.data.result)
    } catch (error) {
      setResult('Erreur lors du calcul: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="calculator-container">
      <div className="calculator-card">
        <h1>Calculatrice</h1>
        
        <div className="input-group">
          <input
            type="number"
            className="input-field"
            value={n1}
            onChange={(e) => setN1(e.target.value)}
            placeholder="Nombre 1"
          />
        </div>

        <div className="input-group">
          <input
            type="number"
            className="input-field"
            value={n2}
            onChange={(e) => setN2(e.target.value)}
            placeholder="Nombre 2"
          />
        </div>

        <div className="button-group">
          <button
            className="btn btn-somme"
            onClick={handleSomme}
            disabled={loading}
          >
            Somme
          </button>
          <button
            className="btn btn-produit"
            onClick={handleProduit}
            disabled={loading}
          >
            Produit
          </button>
        </div>

        {result && (
          <div className="result-box">
            <strong>Résultat:</strong> {result}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
