import { Router } from "express";

import Tree from "../models/tree.js";

const router = Router();

router.get('/:id', async(req, res) => {
    const id = req.params.id
    try {
        const tree = await Tree.findById(id);
        if (tree) {
            return res.send(tree);
        }
        else {
            return res.send({code: '404', error: 'error finding tree'})
        }
    } catch (err) {
        console.log(err)
        return res.send({code: '404', error: "error finding tree" });
    }
})


export default router;