import React from 'react'

const Profilebio = ({ currentprofile }) => {
  return (
    <div className="mt-6 space-y-6 text-gray-800">
      {/* Tags Watched Section */}
      <div>
        <h4 className="text-lg font-semibold text-gray-700 mb-2">Tags Watched</h4>
        {currentprofile?.tags?.length !== 0 ? (
          <div className="flex flex-wrap gap-2">
            {currentprofile?.tags.map((tag) => (
              <span
                key={tag}
                className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">0 tags watched</p>
        )}
      </div>

      {/* About Section */}
      <div>
        <h4 className="text-lg font-semibold text-gray-700 mb-2">About</h4>
        {currentprofile?.about ? (
          <p className="text-gray-600 leading-relaxed">{currentprofile.about}</p>
        ) : (
          <p className="text-gray-500">No bio found</p>
        )}
      </div>
    </div>
  )
}

export default Profilebio
