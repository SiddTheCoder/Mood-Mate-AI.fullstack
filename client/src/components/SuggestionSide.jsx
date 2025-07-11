import React, { Component } from 'react'

export class SuggestionSide extends Component {
  render() {
    return (
      <div>
        <h3 className="text-lg font-semibold text-blue-700 flex items-center gap-2">
          <Sparkles size={18} /> Suggestions
        </h3>
        <ul className="text-sm space-y-3 text-blue-800">
          <li className="bg-blue-50 p-3 rounded-lg hover:bg-blue-100 transition cursor-pointer">
            🌤️ “Even the darkest night will end and the sun will rise.”
          </li>
          <li className="bg-purple-50 p-3 rounded-lg hover:bg-purple-100 transition cursor-pointer">
            🎧 Try this calming lo-fi playlist
          </li>
          <li className="bg-blue-100 p-3 rounded-lg hover:bg-blue-200 transition cursor-pointer">
            🧘 Breath tip: Inhale 4s, hold 4s, exhale 4s
          </li>
        </ul>
      </div>
    )
  }
}

export default SuggestionSide
