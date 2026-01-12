import express from 'express'
import {
  createRecord,
  readRecords,
  readRecordById,
  updateRecord,
  deleteRecord,
} from '../utils/database.js'

const router = express.Router()

// Create a new record
router.post('/:table', async (req, res) => {
  try {
    const { table } = req.params
    const data = req.body
    const result = await createRecord(table, data)
    res.status(201).json({ success: true, data: result })
  } catch (error) {
    console.error('Create error:', error)
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create record',
    })
  }
})

// Read all records (with optional filters)
router.get('/:table', async (req, res) => {
  try {
    const { table } = req.params
    const filters = req.query as Record<string, unknown>
    const results = await readRecords(table, filters)
    res.json({ success: true, data: results })
  } catch (error) {
    console.error('Read error:', error)
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to read records',
    })
  }
})

// Read a single record by ID
router.get('/:table/:id', async (req, res) => {
  try {
    const { table, id } = req.params
    const result = await readRecordById(table, id)
    if (!result) {
      return res.status(404).json({ success: false, error: 'Record not found' })
    }
    res.json({ success: true, data: result })
  } catch (error) {
    console.error('Read by ID error:', error)
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to read record',
    })
  }
})

// Update a record
router.put('/:table/:id', async (req, res) => {
  try {
    const { table, id } = req.params
    const data = { ...req.body, id }
    const result = await updateRecord(table, data)
    res.json({ success: true, data: result })
  } catch (error) {
    console.error('Update error:', error)
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update record',
    })
  }
})

// Delete a record
router.delete('/:table/:id', async (req, res) => {
  try {
    const { table, id } = req.params
    const success = await deleteRecord(table, id)
    if (!success) {
      return res.status(404).json({ success: false, error: 'Record not found' })
    }
    res.json({ success: true, message: 'Record deleted successfully' })
  } catch (error) {
    console.error('Delete error:', error)
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete record',
    })
  }
})

export default router
