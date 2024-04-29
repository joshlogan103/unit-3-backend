import Profile from '../models/profileModel.js'

// Get all profiles

export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find({})

    if (!profiles
    ) {
      return res.status(404).json({
        error: `No profiles found`
      })
    }

    res.json(profiles)

  } catch (error) {
    res.status(500).json({
      error: `Internal server error: ${error}`
    })
  }
}

// Get one Profile by ID

export const getProfileById = async (req, res) => {
  try {
    const { id } = req.params

    const profile = await Profile.findById(id)

    if (!profile) {
      return res.status(404).json({
        error: `Profile not found`
      })
    }

    res.json(profile)

  } catch (error) {
    res.status(500).json({
      error: `Internal server error: ${error}`
    })
  }
}

// Create a Profile

export const createProfile = async (req, res) => {
  try {
    const profileData = req.body

    if (!profileData.length === 0) {
      return res.status(401).json({
        error: `No profile data found`
      })
    }

    const profileCreated = await Profile.create(profileData)

    if (!profileCreated) {
      return res.status(404).json({
        error: `Profile was not able to be created`
      })
    }

    res.json({
      message: `Profile ${profileData.name} was created successfully`
    })

  } catch (error) {
    res.status(500).json({
      error: `Internal server error: ${error}`
    })
  }
}

// Update a Profile by ID

export const updateProfileByID = async (req, res) => {
  try {
    const { id } = req.params
    const profileData = req.body

    const profileToUpdate = await Profile.findById(id)

    if (!profileToUpdate) {
      return res.status(404).json({
        error: `Could not find a profile with ID ${id}`
      })
    }

    Object.entries(profileData).forEach(([key, value]) => {
      if(key === 'location' || key === 'socialMedia') {
        Object.entries(value).forEach(([subKey, subValue]) => {
          profileToUpdate[key][subKey] = subValue
        })
        return
      }
      profileToUpdate[key] = value
    })
    
    await profileToUpdate.save()

    res.json({
      message: `Profile ${profileData.name} was updated successfully`
    })

  } catch (error) {
    return res.status(500).json({
      error: `Internal server error: ${error}`
    })
  }
}

// Delete Profile by ID

export const deleteProfileByID = async (req, res) => {
  try {
    const { id } = req.params

    const profileToDelete = await Profile.findByIdAndDelete(id)

    if (!profileToDelete) {
      return res.status(404).json({
        error: `Profile not found and was not deleted`
      })
    }

    res.json({
      message: `Profile was deleted successfully`
    })

  } catch (error) {
    res.status(500).json({
      error: `Internal server error: ${error}`
    })
  }
}
