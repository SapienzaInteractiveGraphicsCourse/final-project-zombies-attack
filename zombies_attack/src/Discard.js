    const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/weapons/", "scene.gltf", this.scene);
    console.log(meshes)

    // Set all other meshes invisible
    meshes.map((mesh) => {
      mesh.isVisible = false;
    })
    let gun;
    rest.transformNodes.map((node) => {
      if (node.name === 'AKS74U') {
        const meshArray = []
        console.log(node)
        node._children.map((child) => {
          console.log(child)
          meshArray.push(child)
        })
        gun = Mesh.MergeMeshes(meshArray)
      }
    })
    console.log(gun)
    gun.isVisible = true;

    gun.parent = camera;
    gun.renderingGroupId = 1;

    gun.rotation = new Vector3(0, 0.8 * Math.PI, 0)

    gun.scaling.x = 0.2;
    gun.scaling.y = 0.2;
    gun.scaling.z = -0.2;
    gun.position = new Vector3(-3.9, -5.3, 1.5);

    /*     const { meshes, ...rest } = await SceneLoader.ImportMeshAsync("", "./models/guns/", "scene.gltf", this.scene);
    console.log(meshes)
    // Set all other meshes invisible
    meshes.map((mesh) => {
      mesh.isVisible = false;
    })
    var gun = meshes[11];
    gun.isVisible = true;
    console.log(rest)

    gun.parent = camera;
    gun.renderingGroupId = 1;

    gun.rotation = new Vector3(0, Math.PI / 2, - Math.PI / 2)

    gun.scaling.x = 0.2;
    gun.scaling.y = 0.2;
    gun.scaling.z = -0.2;
    gun.position = new Vector3(0.2, -0.2, 0.55); */